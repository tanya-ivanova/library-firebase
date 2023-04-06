import { useContext } from "react";
import { Link } from 'react-router-dom';

import { LanguageContext } from "../../../../contexts/LanguageContext";
import { languages } from '../../../../languages/languages';
import Card from "../../../common/card/Card";

import styles from './BookItem.module.css';


const BookItemGoogle = ({ book }) => {
    const { language } = useContext(LanguageContext);

    return (
        <Card>
            <div className={styles["book-item-wrapper"]}>
                {book.volumeInfo.imageLinks?.thumbnail 
                    ? <img width="130" height="180" src={book.volumeInfo.imageLinks?.thumbnail} alt={book.volumeInfo.title} />
                    : <img src="http://placehold.it/130x180" alt={book.volumeInfo.title} />
                }
                
                <div className={styles["book-item"]}>
                    <div className={styles["google-book-details"]}>
                        <h1 className={styles.title}>{book.volumeInfo.title}</h1>
                        <h2 className={styles.author}>{book.volumeInfo.authors?.join(', ')}</h2>
                        <h3 className={styles.genre}>{book.volumeInfo.categories?.join(', ')} {book.volumeInfo.publishedDate} {book.volumeInfo.language.toUpperCase()}</h3>
                        <p className={styles.summary}>{book.volumeInfo.description?.substring(0, 200).concat('...')}</p>
                        <Link className={styles["btn-add"]} to={`/${book.id}/create`}>{languages.addBook[language]}</Link>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default BookItemGoogle;
