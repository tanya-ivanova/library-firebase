import { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";

import { LanguageContext } from "../../contexts/LanguageContext";
import { languages } from '../../languages/languages';
import * as bookService from '../../services/bookService';
import BookItemGoogle from '../catalog/bookItem/BookItemGoogle';
import Pager from "../common/pager/Pager";
import Spinner from "../common/spinner/Spinner";
import SearchForm from './SearchForm';

import styles from './Search.module.css';

const SearchInGoogle = () => {
    const { language } = useContext(LanguageContext);

    const navigate = useNavigate();

    const [searchResults, setSearchResults] = useState([]);

    const [criteria, setCriteria] = useState('title');
    const [search, setSearch] = useState('');

    const [pages, setPages] = useState(1);

    const [isLoading, setIsLoading] = useState(false);

    const location = useLocation();

    let queryAll = new URLSearchParams(location.search).get("query") || '';
    let page = 1;
    let query;
    let searchBy;

    if (queryAll) {
        query = queryAll.split('?')[0];

        searchBy = queryAll.split('?')[1].split('=')[1];

        if (queryAll.split('?')[2]) {
            page = Number(queryAll.split('?')[2].split('=')[1]);
        }
    }

    useEffect(() => {
        let modifiedQueryForForm;
        if(query && query.split('-').length > 1) {
            modifiedQueryForForm = query.split('-').join(' ');
        } else if(query && query.split('-').length === 1) {
            modifiedQueryForForm = query;            
        }
        setSearch(modifiedQueryForForm || '');
        setCriteria(searchBy || 'title');
    }, [query, searchBy]);

    useEffect(() => {
        if (query && searchBy) {

            bookService.searchInGoogleGetMany(searchBy, query, page)
                .then(({ googleBooks, pages }) => {
                    setSearchResults(googleBooks.items || []);
                    setPages(pages);
                    setIsLoading(false);
                })
                .catch(err => {
                    alert(err.message);
                    console.log(err.message);
                });
        }
    }, [searchBy, query, page]);

    if (isLoading) {
        return (
            <div className="spinner">
                <Spinner />
            </div>
        )
    }

    const changeValueHandler = (e) => {        
        setSearch(e.target.value);
    };

    const onSearchCriteriaChange = (e) => {
        setCriteria(e.target.value);
    }

    const onSearch = (e) => {
        e.preventDefault();
        let modifiedSearchForRequest;
        if(search.split(' ').length > 1) {
            modifiedSearchForRequest = search.split(' ').join('-');
        } else {
            modifiedSearchForRequest = search;
        }
        navigate(`/searchInGoogle?query=${modifiedSearchForRequest}?searchBy=${criteria}`);
        if (query) {
            setIsLoading(true);
        }
    };
    
    return (
        <>
            <section className={styles["search-page"]}>
                <h1 className={styles["search-title"]}>{languages.searchInGoogleAndAddBook[language]}</h1>

                <SearchForm
                    onSearch={onSearch}
                    criteria={criteria}
                    onSearchCriteriaChange={onSearchCriteriaChange}
                    search={search}
                    changeValueHandler={changeValueHandler}
                    showOptionGenre={false}
                />

                {searchResults.length > 0 &&
                    <section className="pager">
                        <Pager page={page} pages={pages} query={query} searchBy={searchBy} />
                    </section>
                }
                
                <div className={styles["results-wrapper"]}>
                    {searchResults.length > 0
                        ? searchResults.map(x => <BookItemGoogle key={x.id} book={x} />)
                        : <h2 className="message-when-no-data">{languages.noResults[language]}</h2>
                    }
                </div>
            </section>

            {searchResults.length > 0 &&
                <section className="pager">
                    <Pager page={page} pages={pages} query={query} searchBy={searchBy} />
                </section>
            }
        </>
    );
};

export default SearchInGoogle;
