import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { LanguageContext } from "../../../contexts/LanguageContext";
import { languages } from '../../../languages/languages';
import BookItem from "../catalog/bookItem/BookItem";
import Spinner from "../../common/spinner/Spinner";
import PagerFirebase from "../../common/pager/PagerFirebase";
import styles from './Profile.module.css';

import { firebaseApp } from '../../../firebase';
import { getFirestore, collection, query, where, getDocs, orderBy, limit, startAfter, endBefore, limitToLast } from "firebase/firestore";
const db = getFirestore(firebaseApp);

const Profile = () => {
    const { language } = useContext(LanguageContext);

    const { user } = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(true);

    const [books, setBooks] = useState([]);

    const [lastDoc, setLastDoc] = useState();
    const [firstDoc, setFirstDoc] = useState();
    const [theVeryFirstDoc, setTheVeryFirstDoc] = useState();
    const [isEmpty, setIsEmpty] = useState(false);
    const [isBeginning, setIsBeginning] = useState(true);        

    useEffect(() => {      
        const booksRef = collection(db, "books");
        const q = query(booksRef, where("_ownerId", "==", user._id), orderBy('title'), limit(6));
        getDocs(q)
            .then((querySnapshot) => {
                setIsLoading(false);
                if (querySnapshot.size !== 0) {                    
                    const books = querySnapshot.docs.map(book => ({ ...book.data(), _id: book.id }));
                    setBooks(books);

                    const theVeryFirstDoc = querySnapshot.docs[0];
                    setTheVeryFirstDoc(theVeryFirstDoc);
                    const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
                    setLastDoc(lastDoc);

                    if (querySnapshot.size < 6) {
                        setIsEmpty(true);
                    } else {
                        setIsEmpty(false);
                    }
                } else {
                    setIsEmpty(true);
                }
            })
            .catch(err => {
                console.log(err);
                setBooks([]);
                setIsLoading(false);
            });

    }, [user._id]);

    const fetchMore = () => {
        const booksRef = collection(db, "books");

        const qLimited = query(booksRef, where("_ownerId", "==", user._id), orderBy('title'), startAfter(lastDoc), limit(6));
        getDocs(qLimited)
            .then((querySnapshot) => {
                if (querySnapshot.size !== 0) {
                    setIsLoading(false);
                    const books = querySnapshot.docs.map(book => ({ ...book.data(), _id: book.id }));
                    setBooks(books);

                    const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
                    const firstDoc = querySnapshot.docs[querySnapshot.docs.length - querySnapshot.size];

                    setLastDoc(lastDoc);
                    setFirstDoc(firstDoc);
                    setIsBeginning(false);

                    if(querySnapshot.size < 6) {
                        setIsEmpty(true);
                    }
                } else {
                    setIsEmpty(true);
                }

            })
            .catch(err => {
                console.log(err);
                setBooks([]);
                setIsLoading(false);
            });
    };

    const fetchLess = () => {
        const booksRef = collection(db, "books");

        const qLimited = query(booksRef, where("_ownerId", "==", user._id), orderBy('title'), endBefore(firstDoc), limitToLast(6));
        getDocs(qLimited)
            .then((querySnapshot) => {
                if (querySnapshot.size !== 0) {
                    setIsLoading(false);
                    const books = querySnapshot.docs.map(book => ({ ...book.data(), _id: book.id }));
                    setBooks(books);

                    const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
                    const firstDoc = querySnapshot.docs[querySnapshot.docs.length - querySnapshot.size];
                    
                    setLastDoc(lastDoc);
                    setFirstDoc(firstDoc);
                    setIsEmpty(false);

                    if(firstDoc.data().title === theVeryFirstDoc.data().title) {
                        setIsBeginning(true);
                    }
                } else {
                    setIsBeginning(true);
                }

            })
            .catch(err => {
                console.log(err);
                setBooks([]);
                setIsLoading(false);
            });
    };

    if (isLoading) {
        return (
            <div className="spinner">
                <Spinner />
            </div>
        )
    }

    return (
        <>          
            <section className={styles["profile-page"]}>
                {books.length > 0
                    ? books.map(x => <BookItem key={x._id} book={x} />)
                    : <h2 className="message-when-no-data">{languages.noBooksYet[language]}</h2>
                }
            </section>
            <PagerFirebase
                isBeginning={isBeginning}
                isEmpty={isEmpty}
                fetchLess={fetchLess}
                fetchMore={fetchMore}
            />           
        </>
    );
};

export default Profile;
