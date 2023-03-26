import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { LanguageContext } from "../../contexts/LanguageContext";
import { languages } from '../../languages/languages';
import BookItem from "../catalog/bookItem/BookItem";
import Spinner from "../common/spinner/Spinner";
import styles from './Profile.module.css';

import { firebaseApp } from '../../firebase';
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
const db = getFirestore(firebaseApp);

const Profile = () => {
    const { language } = useContext(LanguageContext);

    const { user } = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(true);

    const [books, setBooks] = useState([]);
        

    useEffect(() => {        

        const booksRef = collection(db, "books");
        const q = query(booksRef, where("_ownerId", "==", user._id));
        getDocs(q)
            .then((querySnapshot) => {                
                setIsLoading(false);
                const books = querySnapshot.docs.map(book => ({ ...book.data(), _id: book.id }));
                setBooks(books);
            })
            .catch((err) => {
                console.log(err);
                setBooks([]);
                setIsLoading(false);
            });

    }, [user._id]);

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
            
        </>
    );
};

export default Profile;
