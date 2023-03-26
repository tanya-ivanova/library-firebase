import { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from "react-router-dom";

import { LanguageContext } from "../../contexts/LanguageContext";
import { languages } from '../../languages/languages';
import BookItem from "../catalog/bookItem/BookItem";
import Pager from "../common/pager/Pager";
import Spinner from "../common/spinner/Spinner";
import SearchForm from './SearchForm';

import styles from './Search.module.css';

import { firebaseApp } from '../../firebase';
import { getFirestore, collection, query, where, getDocs} from "firebase/firestore";
const db = getFirestore(firebaseApp);

const Search = () => {
    const { language } = useContext(LanguageContext);

    const navigate = useNavigate();

    const [searchResults, setSearchResults] = useState([]);

    const [criteria, setCriteria] = useState('title');
    const [search, setSearch] = useState("");

    const [pages, setPages] = useState(1);

    const [isLoading, setIsLoading] = useState(false);

    const location = useLocation();

    let queryAll = new URLSearchParams(location.search).get("query") || '';
    let page = 1;
    let queryUrl;
    let searchBy;

    if (queryAll) {

        queryUrl = queryAll.split('?')[0];

        searchBy = queryAll.split('?')[1].split('=')[1];

        if (queryAll.split('?')[2]) {
            page = Number(queryAll.split('?')[2].split('=')[1]);
        }
    }

    useEffect(() => {
        setSearch(queryUrl || '');
        setCriteria(searchBy || 'title');
    }, [queryUrl, searchBy]);

    useEffect(() => {
        setSearchResults([]);
        if (queryUrl && searchBy) {            

            const booksRef = collection(db, "books");
            const q = query(booksRef, where(searchBy, "==", queryUrl));

            getDocs(q)
                .then((querySnapshot) => {
                    setPages(Math.ceil(querySnapshot.docs.length / 6));
                });

            const qLimited = query(booksRef, where(searchBy, "==", queryUrl));
            getDocs(qLimited)
                .then((querySnapshot) => {                    
                    setIsLoading(false);
                    const books = querySnapshot.docs.map(book => ({ ...book.data(), _id: book.id }));
                    setSearchResults(books);
                })
                .catch((err) => {
                    alert(err.message);
                    console.log(err.message);
                    setIsLoading(false);
                });
        }
    }, [page, searchBy, queryUrl]);

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
        navigate(`/search?query=${search}?searchBy=${criteria}`);
        if (queryUrl) {
            setIsLoading(true);
        }
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
                    showOptionGenre={true}
                />

                {searchResults.length > 0 &&
                    <section className="pager">
                        <Pager page={page} pages={pages} query={queryUrl} searchBy={searchBy} />
                    </section>
                }

                <div className={styles["results-wrapper"]}>
                    {searchResults.length > 0
                        ? searchResults.map(x => <BookItem key={x._id} book={x} />)
                        : <h2 className="message-when-no-data">{languages.noResults[language]}</h2>
                    }
                </div>
            </section>

            {searchResults.length > 0 &&
                <section className="pager">
                    <Pager page={page} pages={pages} query={queryUrl} searchBy={searchBy} />
                </section>
            }
        </>
    );
};

export default Search;
