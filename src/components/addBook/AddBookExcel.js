import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import readXlsxFile from 'read-excel-file';
import { AuthContext } from '../../contexts/AuthContext';
import { LanguageContext } from '../../contexts/LanguageContext';
import { languages } from '../../languages/languages';
import Backdrop from '../common/backdrop/Backdrop';
import ModalError from '../common/modal/ModalError';

import styles from './AddBookExcel.module.css';

import { firebaseApp } from '../../firebase';
import { getFirestore, collection, addDoc } from "firebase/firestore";
const db = getFirestore(firebaseApp);

const IMAGE_URL_PATTERN = /^https?:\/\/.+$/i;

const schema = {
    'Title': {
        prop: 'title',
        type: String,
        required: true,
        validate: (value) => {
            if (value.length < 3) {
                throw new Error('invalid');
            }
            return value;
        }
    },
    'Author': {
        prop: 'author',
        type: String,
        required: true,
        validate: (value) => {
            if (value.length < 3) {
                throw new Error('invalid');
            }
            return value;
        }
    },
    'Genre': {
        prop: 'genre',
        type: String,
        required: true,
        validate: (value) => {
            if (value.length < 3) {
                throw new Error('invalid');
            }
            return value;
        }
    },
    'Image URL': {
        prop: 'imageUrl',
        type: String,
        required: true,
        validate: (value) => {
            if (!IMAGE_URL_PATTERN.test(value)) {
                throw new Error('invalid');
            }
            return value;
        }
    },
    'Year': {
        prop: 'year',
        type: Number,
        required: true,
        validate: (value) => {
            const number = Number(value);
            if (number < 0 || isNaN(number)) {
                throw new Error('invalid');
            }
            return value;
        }
    },
    'Summary': {
        prop: 'summary',
        type: String,
        required: true,
        validate: (value) => {
            if (value.length < 10) {
                throw new Error('invalid');
            }
            return value;
        }
    },
}

const AddBookExcel = () => {
    const { user } = useContext(AuthContext);
    const { language } = useContext(LanguageContext);

    const navigate = useNavigate();

    const [showModalError, setShowModalError] = useState(false);
    const [errorMessage, setErrorMessage] = useState([]);

    const getFile = (e) => {
        readXlsxFile(e.target.files[0], { schema })
            .then(({ rows, errors }) => {    

                if (errors.length > 0) {
                    setErrorMessage(state => [...state, languages.noBooksAdded[language]]);

                    errors.forEach(error => {
                        setErrorMessage(state => [...state, `${languages.column[language]} ${error.column}, ${languages.row[language]} ${error.row} - ${languages.error[language]}: ${error.error}`]);
                    });

                    setErrorMessage(state => [...state, languages.fixErrors[language]]);
                    setShowModalError(true); 
                    e.target.value = '';                   
                } else {
                    rows.forEach(book => {
                        book.ownerEmail = user.email;
                        book._ownerId = user._id;
                        
                        addDoc(collection(db, "books"), book)
                            .then(() => {})
                            .catch((err) => {
                                console.error("Error adding document: ", err);
                            });
                    });
                    setErrorMessage([]);
                    e.target.value = '';
                    navigate(`/catalog`);
                }
            });
    };

    const onClickOk = () => {
        setShowModalError(false);
        setErrorMessage([]);
    }

    return (
        <section className={styles["add-book-excel-page"]}>
            {showModalError && <Backdrop onClick={onClickOk} />}
            {showModalError && <ModalError errorMessage={errorMessage} onClickOk={onClickOk} />}

            <div>
                <h1 className={styles["add-book-excel-title"]}>{languages.addBooksFromExcelTitle[language]}</h1>
                <p className={styles["add-book-excel-explanation"]}>{languages.addBooksFromExcelParagraph1[language]}</p>
                <p className={styles["add-book-excel-explanation"]}>{languages.addBooksFromExcelParagraph2[language]}</p>
                <p className={styles["add-book-excel-chooseFileParagraph"]}>{languages.addBooksFromExcelChooseFile[language]}</p>

                <form>
                    <input
                        type="file"
                        onChange={getFile}
                    />
                </form>
            </div>
        </section>
    );
};

export default AddBookExcel;
