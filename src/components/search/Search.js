import { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from "react-router-dom";

import { LanguageContext } from "../../contexts/LanguageContext";
import { languages } from '../../languages/languages';
import BookItem from "../catalog/bookItem/BookItem";
import Spinner from "../common/spinner/Spinner";
import SearchForm from './SearchForm';

import styles from './Search.module.css';

import { firebaseApp } from '../../firebase';
import { getFirestore, collection, query, where, getDocs, orderBy, limit, startAfter, endBefore, limitToLast } from "firebase/firestore";
import PagerFirebase from '../common/pager/PagerFirebase';
const db = getFirestore(firebaseApp);

const Search = () => {
    const { language } = useContext(LanguageContext);

    const navigate = useNavigate();

    const [searchResults, setSearchResults] = useState([]);

    const [criteria, setCriteria] = useState('title');
    const [search, setSearch] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const location = useLocation();

    const [lastDoc, setLastDoc] = useState();
    const [firstDoc, setFirstDoc] = useState();
    const [theVeryFirstDoc, setTheVeryFirstDoc] = useState();
    const [isEmpty, setIsEmpty] = useState(false);
    const [isBeginning, setIsBeginning] = useState(true);

    let queryAll = new URLSearchParams(location.search).get("query") || '';
    let queryUrl;
    let searchBy;

    if (queryAll) {
        queryUrl = queryAll.split('?')[0];
        searchBy = queryAll.split('?')[1].split('=')[1];
    }

    useEffect(() => {
        setSearch(queryUrl || '');
        setCriteria(searchBy || 'title');        
    }, [queryUrl, searchBy]);

    useEffect(() => {
        if(queryAll === '' || queryUrl === '') {
            setSearchResults([]);
            setIsEmpty(true);
            setIsBeginning(true);
            setIsLoading(false);
        }
    }, [queryAll, queryUrl]);

    useEffect(() => {
        //setSearchResults([]);
        if (queryUrl && searchBy) {

            const booksRef = collection(db, "books");
            let qLimited;
            if(searchBy === 'author') {
                qLimited = query(booksRef, where(searchBy, "==", queryUrl), orderBy('title'), limit(6));
            } else if (searchBy === 'title') {
                qLimited = query(booksRef, where(searchBy, "==", queryUrl), orderBy('author'), limit(6));
            }
            getDocs(qLimited)
                .then((querySnapshot) => {
                    setIsLoading(false);
                    if (querySnapshot.size !== 0) {
                        const books = querySnapshot.docs.map(book => ({ ...book.data(), _id: book.id }));
                        setSearchResults(books);

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
                    setSearchResults([]);
                    setIsLoading(false);
                });
        }
    }, [searchBy, queryUrl]);

    if (isLoading) {
        return (
            <div className="spinner">
                <Spinner />
            </div>
        )
    }

    const changeValueHandler = (e) => {
        setSearch(e.target.value)
    };

    const onSearchCriteriaChange = (e) => {
        setCriteria(e.target.value);
    }

    const onSearch = (e) => {
        e.preventDefault();
        setSearchResults([]);
        navigate(`/search?query=${search}?searchBy=${criteria}`);
        if (queryUrl) {
            setIsLoading(true);
        }
    };

    const fetchMore = () => {
        const booksRef = collection(db, "books");

        let qLimited;
        if(searchBy === 'author') {
            qLimited = query(booksRef, where(searchBy, "==", queryUrl), orderBy('title'), startAfter(lastDoc), limit(6));
        } else if(searchBy === 'title') {
            qLimited = query(booksRef, where(searchBy, "==", queryUrl), orderBy('author'), startAfter(lastDoc), limit(6));
        }
        getDocs(qLimited)
            .then((querySnapshot) => {
                setIsLoading(false);
                if (querySnapshot.size !== 0) {                    
                    const books = querySnapshot.docs.map(book => ({ ...book.data(), _id: book.id }));
                    setSearchResults(books);

                    const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
                    const firstDoc = querySnapshot.docs[querySnapshot.docs.length - querySnapshot.size];

                    setLastDoc(lastDoc);
                    setFirstDoc(firstDoc);
                    setIsBeginning(false);

                    if (querySnapshot.size < 6) {
                        setIsEmpty(true);
                    }
                } else {
                    setIsEmpty(true);
                }
            })
            .catch(err => {
                console.log(err);
                setSearchResults([]);
                setIsLoading(false);
            });
    };

    const fetchLess = () => {
        const booksRef = collection(db, "books");

        let qLimited;
        if(searchBy === 'author') {
            qLimited = query(booksRef, where(searchBy, "==", queryUrl), orderBy('title'), endBefore(firstDoc), limitToLast(6));
        } else if(searchBy === 'title') {
            qLimited = query(booksRef, where(searchBy, "==", queryUrl), orderBy('author'), endBefore(firstDoc), limitToLast(6));
        }
        getDocs(qLimited)
            .then((querySnapshot) => {
                setIsLoading(false);
                if (querySnapshot.size !== 0) {                    
                    const books = querySnapshot.docs.map(book => ({ ...book.data(), _id: book.id }));
                    setSearchResults(books);

                    const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
                    const firstDoc = querySnapshot.docs[querySnapshot.docs.length - querySnapshot.size];

                    setLastDoc(lastDoc);
                    setFirstDoc(firstDoc);
                    setIsEmpty(false);

                    if (firstDoc.data().title === theVeryFirstDoc.data().title) {
                        setIsBeginning(true);
                    }
                } else {
                    setIsBeginning(true);
                }
            })
            .catch(err => {
                console.log(err);
                setSearchResults([]);
                setIsLoading(false);
            });
    };

    return (
        <>
            <section className={styles["search-page"]}>
                <h1 className={styles["search-title"]}>{languages.searchInSite[language]}</h1>

                <SearchForm
                    onSearch={onSearch}
                    criteria={criteria}
                    onSearchCriteriaChange={onSearchCriteriaChange}
                    search={search}
                    changeValueHandler={changeValueHandler}                    
                />

                <div className={styles["results-wrapper"]}>
                    {searchResults.length > 0
                        ? searchResults.map(x => <BookItem key={x._id} book={x} />)
                        : <h2 className="message-when-no-data">{languages.noResults[language]}</h2>
                    }
                </div>
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

export default Search;
