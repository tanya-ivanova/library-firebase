import { useState, useEffect, useContext } from "react";
import { LanguageContext } from "../../contexts/LanguageContext";
import { languages } from '../../languages/languages';

import Spinner from "../common/spinner/Spinner";

import BookItem from "./bookItem/BookItem";
import styles from './Catalog.module.css';

import { firebaseApp } from '../../firebase';
import { getFirestore, collection, getDocs, query, startAfter, endBefore, limit, orderBy, limitToLast } from "firebase/firestore";
const db = getFirestore(firebaseApp);

const Catalog = () => {
    const { language } = useContext(LanguageContext);

    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);    

    const [lastDoc, setLastDoc] = useState();
    const [firstDoc, setFirstDoc] = useState();
    const [isEmpty, setIsEmpty] = useState(false);
    const [isBeginning, setIsBeginning] = useState(true);  

    useEffect(() => {
        const booksRef = collection(db, "books");
        
        const qLimited = query(booksRef, orderBy('title'), limit(4));
        getDocs(qLimited)
            .then((querySnapshot) => {
                if (querySnapshot.size !== 0) {
                    setIsLoading(false);
                    const books = querySnapshot.docs.map(book => ({ ...book.data(), _id: book.id }));
                    setBooks(books);

                    const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
                    setLastDoc(lastDoc);
                } else {
                    setIsEmpty(true);
                }

            })
            .catch(err => {
                console.log(err);
                setBooks([]);
                setIsLoading(false);
            });

    }, []);

    const fetchMore = () => {
        const booksRef = collection(db, "books");

        const qLimited = query(booksRef, orderBy('title'), startAfter(lastDoc), limit(4));
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

        const qLimited = query(booksRef, orderBy('title'), endBefore(firstDoc), limitToLast(4));
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
            <section className={styles["catalog-page"]}>
                {books.length > 0
                    ? books.map(x => <BookItem key={x._id} book={x} />)
                    : <h2 className="message-when-no-data">{languages.noBooksYet[language]}</h2>
                }
            </section>
            <div className={styles["pagination-section"]}>
                <div>
                    {!isBeginning && <button onClick={fetchLess}>Less books</button>}
                    {isBeginning && <p>This is the beginning of the listing of the books</p>}
                </div>
                <div>
                    {!isEmpty && <button onClick={fetchMore}>More books</button>}
                    {isEmpty && <p>There are no more books</p>}
                </div>
            </div>
        </>
    );
};

export default Catalog;
