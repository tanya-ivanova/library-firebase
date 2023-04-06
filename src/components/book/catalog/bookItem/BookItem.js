import { useContext } from "react";
import { Link } from 'react-router-dom';

import { LanguageContext } from "../../../../contexts/LanguageContext";
import { languages } from '../../../../languages/languages';
import Card from "../../../common/card/Card";

import styles from './BookItem.module.css';

const BookItem = ({ book }) => {
    const { language } = useContext(LanguageContext);

    return (
        <Card>
            <div className={styles["book-item-wrapper"]}>
                <img width="130" height="180" src={book.imageUrl} alt={book.title} />
                <div className={styles["book-item"]} >
                    <div className={styles["google-book-details"]}>
                        <h1 className={styles.title}>{book.title}</h1>
                        <h2 className={styles.author}>{book.author}</h2>
                        <h3 className={styles.genre}>{book.genre}</h3>
                        <Link className={styles["btn-details"]} to={`/catalog/${book._id}/details`}>{languages.details[language]}</Link>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default BookItem;
