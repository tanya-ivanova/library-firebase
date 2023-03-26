import { useContext } from "react";
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { LanguageContext } from "../../../contexts/LanguageContext";
import {languages} from '../../../languages/languages';
import styles from './Pager.module.css';


const Pager = ({ page, pages, query, searchBy }) => {
    const {language} = useContext(LanguageContext);

    const location = useLocation();
        
    let linkToPrev;
    let linkToNext;

    if(query) {        
        linkToPrev = page !== 1 ? `${location.pathname}?query=${query}?searchBy=${searchBy}?page=${page - 1}` : null;
        linkToNext = page < pages ? `${location.pathname}?query=${query}?searchBy=${searchBy}?page=${page + 1}` : null;
    } else {
        linkToPrev = page !== 1 ? `${location.pathname}?page=${page - 1}` : null;
        linkToNext = page < pages ? `${location.pathname}?page=${page + 1}` : null;
    }
    
    
    const onClickPrev = (e) => {        
        if(page === 1) {            
            e.preventDefault();
        }
    };
    
    const onClickNext = (e) => {        
        if(page === pages) {            
            e.preventDefault();
        }
    };

    return (
        <div >
            <div className={`${styles["position-right"]} ${styles.numberOfPages}`}>{languages.page[language]} {page} {languages.of[language]} {pages}</div>
            <div className={styles["position-right"]}>
                <Link to={linkToPrev} onClick={onClickPrev} className={`pageLink ${!linkToPrev ? "disabledCursor" : ''}`} >&lt; {languages.prev[language]}</Link>
                <Link to={linkToNext} onClick={onClickNext} className={`pageLink ${!linkToNext ? "disabledCursor" : ''}`} >{languages.next[language]} &gt;</Link>
            </div>
        </div>
    );
};

export default Pager;
