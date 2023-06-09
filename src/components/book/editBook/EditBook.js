import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from 'react-router-dom';

import { AuthContext } from "../../../contexts/AuthContext";
import { LanguageContext } from "../../../contexts/LanguageContext";
import { languages } from '../../../languages/languages';
import { useValidateForm } from '../../../hooks/useValidateForm';
import { isUserAdmin } from "../../../utils/utils";
import Backdrop from "../../common/backdrop/Backdrop";
import ModalError from "../../common/modal/ModalError";
import Notification from "../../common/notification/Notification";
import Spinner from "../../common/spinner/Spinner";

import styles from './EditBook.module.css';

import { firebaseApp } from '../../../firebase';
import { getFirestore, doc, getDoc, runTransaction } from "firebase/firestore";
const db = getFirestore(firebaseApp);

const EditBook = () => {
    const { language } = useContext(LanguageContext);

    const { bookId } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);

    const [isOwner, setIsOwner] = useState(true);

    const [showModalError, setShowModalError] = useState(false);
    const [errorMessage, setErrorMessage] = useState([]);

    const [showNotification, setShowNotification] = useState(true);

    const [values, setValues] = useState({
        title: '',
        author: '',
        genre: '',
        imageUrl: '',
        year: '',
        summary: ''
    });

    useEffect(() => {
        const docRef = doc(db, "books", bookId);

        getDoc(docRef)
            .then((docSnap) => {
                const bookData = { ...docSnap.data(), _id: bookId };
                setValues({
                    title: bookData.title,
                    author: bookData.author,
                    genre: bookData.genre,
                    imageUrl: bookData.imageUrl,
                    year: bookData.year,
                    summary: bookData.summary
                });
                setIsOwner(user._id && user._id === bookData._ownerId);
                setIsLoading(false);
            })
            .catch(err => {
                alert(err.message);
                console.log(err);
            });
    }, [bookId, user._id]);

    useEffect(() => {
        if (values.title === '' || values.author === '' || values.genre === ''
            || values.imageUrl === '' || values.year === '' || values.summary === '') {
            setShowNotification(true);
        } else {
            setShowNotification(false);
        }
    }, [values.title, values.author, values.genre, values.imageUrl, values.year, values.summary])

    const {minLength, isPositive, isValidUrl, isFormValid, errors} = useValidateForm(values);

    if (isLoading) {
        return (
            <div className="spinner">
                <Spinner />
            </div>
        )
    }

    const isAdmin = isUserAdmin(user);

    if (!isAdmin && !isOwner) {
        throw new Error('You are not authorized');
    }

    const changeValueHandler = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }))
    };    

    const onClickOk = () => {
        setShowModalError(false);
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        const bookData = {
            title: values.title,
            author: values.author,
            genre: values.genre,
            imageUrl: values.imageUrl,
            year: values.year,
            summary: values.summary,
        };

        if (bookData.title === '' || bookData.author === '' || bookData.genre === ''
            || bookData.imageUrl === '' || bookData.year === '' || bookData.summary === '') {
            return alert('All fields are required!');
        }

        const docRef = doc(db, "books", bookId);
        try {
            await runTransaction(db, async (transaction) => {
                const bookDoc = await transaction.get(docRef);
                if (!bookDoc.exists()) {
                    throw new Error("Document does not exist!");
                }

                transaction.update(docRef, {
                    title: bookData.title,
                    author: bookData.author,
                    genre: bookData.genre,
                    imageUrl: bookData.imageUrl,
                    year: bookData.year,
                    summary: bookData.summary,
                });
            });

        } catch (err) {
            setShowModalError(true);
            setErrorMessage(state => [...state, err.message]);
            console.log("Transaction failed: ", err);
        }

        navigate(`/catalog/${bookId}/details`);
    };

    const onCancel = () => {
        navigate(`/catalog/${bookId}/details`);
    }

    return (
        <section className={styles["edit-book-page"]}>
            {showNotification && <Notification message={languages.allFieldsRequired[language]} />}

            {showModalError && <Backdrop onClick={onClickOk} />}
            {showModalError && <ModalError errorMessage={errorMessage} onClickOk={onClickOk} />}

            <div className={styles["edit-book-wrapper"]}>
                <form className={styles["edit-book-form"]} onSubmit={onSubmit} >

                    <h1>{languages.editBook[language]}</h1>
                    <label htmlFor="leg-title">{languages.title[language]}</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={values.title}
                        onChange={changeValueHandler}
                        onBlur={(e) => minLength(e, 3)}
                    />

                    {errors.title &&
                        <p className={styles.error}>
                            {languages.titleErrorMessage[language]}
                        </p>
                    }

                    <label htmlFor="author">{languages.author[language]}</label>
                    <input
                        type="text"
                        id="author"
                        name="author"
                        value={values.author}
                        onChange={changeValueHandler}
                        onBlur={(e) => minLength(e, 3)}
                    />

                    {errors.author &&
                        <p className={styles.error}>
                            {languages.authorErrorMessage[language]}
                        </p>
                    }

                    <label htmlFor="genre">{languages.genre[language]}</label>
                    <input
                        type="text"
                        id="genre"
                        name="genre"
                        value={values.genre}
                        onChange={changeValueHandler}
                        onBlur={(e) => minLength(e, 3)}
                    />

                    {errors.genre &&
                        <p className={styles.error}>
                            {languages.genreErrorMessage[language]}
                        </p>
                    }

                    <label htmlFor="imageUrl">{languages.imageUrl[language]}</label>
                    <input
                        type="text"
                        id="imageUrl"
                        name="imageUrl"
                        value={values.imageUrl}
                        onChange={changeValueHandler}
                        onBlur={isValidUrl}
                    />

                    {errors.imageUrl &&
                        <p className={styles.error}>
                            {languages.imageUrlErrorMessage[language]}
                        </p>
                    }

                    <label htmlFor="year">{languages.year[language]}</label>
                    <input
                        type="text"
                        id="year"
                        name="year"
                        value={values.year}
                        onChange={changeValueHandler}
                        onBlur={isPositive}
                    />

                    {errors.year &&
                        <p className={styles.error}>
                            {languages.yearErrorMessage[language]}
                        </p>
                    }

                    <label htmlFor="summary">{languages.summary[language]}</label>
                    <textarea
                        name="summary"
                        id="summary"
                        value={values.summary}
                        onChange={changeValueHandler}
                        onBlur={(e) => minLength(e, 10)}
                        rows="5"
                    />

                    {errors.summary &&
                        <p className={styles.error}>
                            {languages.summaryErrorMessage[language]}
                        </p>
                    }

                    <div className={styles["btn-edit-book"]}>
                        <button type="submit" disabled={!isFormValid} className={styles[`${!isFormValid ? 'button-disabled' : ''}`]} >{languages.editBook[language]}</button>
                        <button type="button" onClick={onCancel} >{languages.cancel[language]}</button>
                    </div>

                </form>
            </div>
        </section>
    );
};

export default EditBook;
