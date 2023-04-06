import { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';

import { AuthContext } from "../../contexts/AuthContext";
import { LanguageContext } from "../../contexts/LanguageContext";
import { languages } from '../../languages/languages';
import Spinner from "../common/spinner/Spinner";
import Backdrop from "../common/backdrop/Backdrop";
import Modal from "../common/modal/Modal";
import Like from "../like/Like";
import Comment from "../comment/Comment";

import styles from './BookDetails.module.css';

import { firebaseApp } from '../../firebase';
import { getFirestore, doc, getDoc, collection, addDoc, deleteDoc, query, where, getDocs } from "firebase/firestore";
import { isUserAdmin } from "../../utils/utils";
const db = getFirestore(firebaseApp);

const BookDetails = () => {
    const { language } = useContext(LanguageContext);

    const { user } = useContext(AuthContext);
    const { bookId } = useParams();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);

    const [showModal, setShowModal] = useState();

    const [currentBook, setCurrentBook] = useState({});
    const [totalLikes, setTotalLikes] = useState(0);
    const [isLiked, setIsLiked] = useState();
    const [comments, setComments] = useState([]);

    const [values, setValues] = useState({
        comment: '',        
    });

    useEffect(() => {       

        const docRef = doc(db, "books", bookId);

        getDoc(docRef)
            .then((docSnap) => {
                const bookData = { ...docSnap.data(), _id: bookId };
                setCurrentBook(bookData);
                setIsLoading(false);
            })
            .catch(() => {
                console.log("No such document!");
            });

        const commentsRef = collection(db, "comments");
        const commentsQ = query(commentsRef, where("bookId", "==", bookId));
        getDocs(commentsQ)
            .then((querySnapshot) => {
                const comments = querySnapshot.docs.map(comment => ({...comment.data(), _id: comment.id}));
                setComments(comments);                
            })
            .catch(() => {
                console.log("No such documents!");
            });

        const likeRef = collection(db, "likes");
        const likesQ = query(likeRef, where("bookId", "==", bookId));        
        getDocs(likesQ)
            .then((querySnapshot) => {
                const likes = querySnapshot.docs.map(like => like.data());
                setTotalLikes(likes.length);                
            })
            .catch(() => {
                console.log("No such documents!");
            });        

        if (user._id) {
            const likesByCurrentUserQ = query(likeRef, where("bookId", "==", bookId), where("_ownerId", "==", user._id));
            
            let likesByCurrentUser = [];
            getDocs(likesByCurrentUserQ)
                .then((querySnapshot) => { 
                    if(querySnapshot.docs.length === 0) {
                        setIsLiked(0);
                    }               
                    querySnapshot.forEach((doc) => {                                                                   
                        const like = { ...doc.data() };                        
                        likesByCurrentUser = [...likesByCurrentUser, like];
                        if (likesByCurrentUser.length === 1) {
                            setIsLiked(1);
                        } 
                    });
                })
                .catch(() => {
                    console.log("No such documents!");
                });
        }

    }, [bookId, user._id]);

    if (isLoading) {
        return (
            <div className="spinner">
                <Spinner />
            </div>
        )
    }

    const isOwner = user._id && user._id === currentBook._ownerId;
    const isAdmin = isUserAdmin(user);
    const showLikeButton = user._id !== undefined && isOwner === false && isAdmin === false && isLiked === 0;

    const showModalHandler = () => {
        setShowModal(true);
    }

    const closeModalHandler = () => {
        setShowModal(false);
    }

    const bookDeleteHandler = async () => {        
        try {
            await deleteDoc(doc(db, "books", bookId));
            if(isAdmin) {
                navigate('/catalog-admin');
            } else {
                navigate('/catalog');
            }

        } catch (err) {
            alert(err.message);
            console.log(err);
        }
    };

    const bookLikeHandler = async () => {        
        try {
            await addDoc(collection(db, "likes"), {
                bookId,
                _ownerId: user._id
            });

            setTotalLikes(state => state + 1);
            setIsLiked(1);

        } catch (err) {
            alert(err.message);
            console.log(err);
        }
    };

    const changeCommentValueHandler = (e) => {
        setValues({comment: e.target.value});
    };

    const addCommentHandler = async (e) => {
        e.preventDefault();
        
        try {
            await addDoc(collection(db, "comments"), {
                bookId,
                text: values.comment,
                user
            });

            setComments(state => {
                return [
                    ...state,
                    {
                        bookId,
                        text: values.comment,
                        user
                    }
                ];
            });

        } catch (err) {
            alert(err.message);
            console.log(err);
        }

        setValues({comment: ''});
    };

    const deleteCommentHandler = (commentId) => {
        if(!isAdmin) {
            throw new Error('You are not authorized!');
        }
        
        deleteDoc(doc(db, "comments", commentId))
            .then(() => {
                setComments(state => state.filter(x => x._id !== commentId));
            })
            .catch(err => {                
                console.log(err);
            });
    };

    let authorForSearch;
    if (currentBook.author.split(' ').length > 1) {
        authorForSearch = currentBook.author.split(' ').join('-');
    } else {
        authorForSearch = currentBook.author;
    }

    return (
        <section className={styles["details-page"]}>
            <div className={styles["details-wrapper"]}>
                <div className={styles["details-part"]}>
                    <div className={styles.container}>
                        <div>
                            <img width="200" height="250" className={styles.image} src={currentBook.imageUrl} alt={currentBook.title} />
                        </div>
                        <div className={styles["book-details"]}>
                            <h1>{currentBook.title}</h1>
                            <div>
                                <h2>{currentBook.author}</h2>
                                <p className={styles["author-paragraph"]}>{languages.searchForMoreBooks[language]} <Link className={styles["more-books-by-author"]} to={`/searchInGoogle?query=${authorForSearch}?searchBy=author`}>{languages.here[language]}</Link>.</p>
                            </div>
                            <h3>{currentBook.genre}, {currentBook.year}</h3>
                            <div>{languages.summary[language]}: {parse(currentBook.summary)}</div>
                        </div>
                    </div>

                    <Like totalLikes={totalLikes} isLiked={isLiked} />

                    {isOwner || isAdmin
                        ? <div className={styles.buttons}>
                            <Link className={styles["btn-edit"]} to={`/catalog/${currentBook._id}/edit`}>{languages.edit[language]}</Link>
                            <button onClick={showModalHandler} className={styles["btn-delete"]}>{languages.delete[language]}</button>

                            {showModal && <Backdrop onClick={closeModalHandler} />}
                            {showModal && <Modal text={languages.areYouSure[language]} onClose={closeModalHandler} onConfirm={bookDeleteHandler} />}
                        </div>
                        : <></>
                    }

                    {showLikeButton
                        ? <div className={styles.buttons}>
                            <button onClick={bookLikeHandler} className={styles["btn-like"]}>{languages.like[language]}</button>
                        </div>
                        : <></>
                    }
                </div>

                <Comment
                    comments={comments}
                    isOwner={isOwner}
                    isAdmin={isAdmin}
                    values={values}
                    changeCommentValueHandler={changeCommentValueHandler}
                    addCommentHandler={addCommentHandler}
                    deleteCommentHandler={deleteCommentHandler}
                />
            </div>
        </section>
    );
};

export default BookDetails;
