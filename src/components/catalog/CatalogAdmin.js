import { useState, useEffect, useContext } from 'react';
import { LanguageContext } from '../../contexts/LanguageContext';
import { languages } from '../../languages/languages';
import BookItemAdmin from './bookItem/BookItemAdmin';
import Spinner from '../common/spinner/Spinner';

import styles from './CatalogAdmin.module.css';
import { AuthContext } from '../../contexts/AuthContext';
import { isUserAdmin } from '../../utils/utils';

import { firebaseApp } from '../../firebase';
import { getFirestore, collection, getDocs, query, limit, orderBy, doc, deleteDoc } from "firebase/firestore";
const db = getFirestore(firebaseApp);

const CatalogAdmin = () => {

    const { language } = useContext(LanguageContext);

    const { user } = useContext(AuthContext);

    const [books, setBooks] = useState([]);

    const [isEmpty, setIsEmpty] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const [recordsToBeDisplayed, setRecordsToBeDisplayed] = useState(6);
    const [totalRecords, setTotalRecords] = useState(0);    

    useEffect(() => {
        const booksRef = collection(db, "books");
        getDocs(booksRef)
            .then((booksSnapshot) => {
                setTotalRecords(booksSnapshot.size);
            });

        const qLimited = query(booksRef, orderBy('title'), limit(recordsToBeDisplayed));
        getDocs(qLimited)
            .then((querySnapshot) => {
                setIsLoading(false);
                if (querySnapshot.size !== 0) {

                    const books = querySnapshot.docs.map(book => ({ ...book.data(), _id: book.id }));
                    setBooks(books);

                    if (querySnapshot.size === totalRecords) {
                        setIsEmpty(true);
                    }  
                } else {
                    setIsEmpty(true);
                }
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false);
                setBooks([]);
            });
    }, [recordsToBeDisplayed, totalRecords]);
      
    const bookDeleteHandler = async (bookId) => {
        try {
            await deleteDoc(doc(db, "books", bookId));            
            setBooks(state => state.filter(x => x._id !== bookId));
            setRecordsToBeDisplayed(state => state - 1);

        } catch (err) {
            alert(err.message);
            console.log(err);
        }        
    };

    const moreRecordsHandler = () => {
        setRecordsToBeDisplayed(state => state + 6);
    };

    if (isLoading) {
        return (
            <div className="spinner">
                <Spinner />
            </div>
        )
    }

    return (
        <section className={styles["catalog-admin"]}>
            <div className={styles["table-wrapper"]}>
                <p className={styles["number-records"]}>{books.length} {languages.outOf[language]} {totalRecords} {languages.records[language]}</p>
                <table>
                    <thead>
                        <tr>
                            <th className={styles["table-title"]}>{languages.title[language]}</th>
                            <th>{languages.author[language]}</th>
                            <th>{languages.year[language]}</th>
                            <th className={styles["table-id"]}>Id</th>
                            <th>{languages.ownerEmail[language]}</th>
                            <th>{languages.actions[language]}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.length > 0 && (
                            books.map(x =>
                                <tr key={x._id}>
                                    <BookItemAdmin
                                        book={x}                                        
                                        bookDeleteHandler={bookDeleteHandler}
                                    />
                                </tr>)
                        )}
                    </tbody>
                </table>
                {!isEmpty && <button onClick={moreRecordsHandler} >{languages.moreRecords[language]}</button>}

            </div>
        </section>
    );
};

export default CatalogAdmin;