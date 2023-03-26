import { useContext } from 'react';

import { LanguageContext } from "../../contexts/LanguageContext";
import { languages } from '../../languages/languages';

import styles from './SearchForm.module.css';

const SearchForm = ({
    onSearch,
    criteria,
    onSearchCriteriaChange,
    search,
    changeValueHandler,
    showOptionGenre
}) => {
    const { language } = useContext(LanguageContext);
    return (
        <div className={styles["form-wrapper"]}>

            <form onSubmit={onSearch} className={styles["search-form"]}>
                <div className={styles["criteria-wrapper"]}>
                    <span>{languages.searchBy[language]}: </span>
                    <select name="criteria" value={criteria} onChange={onSearchCriteriaChange} >
                        <option value="title">{languages.title[language]}</option>
                        <option value="author">{languages.author[language]}</option>
                        {showOptionGenre && <option value="genre">{languages.genre[language]}</option>}
                    </select>
                </div>

                <div className={styles["input-wrapper"]}>
                    <input
                        type="text"
                        name="search"
                        placeholder={languages.lookingFor[language]}
                        value={search}
                        onChange={changeValueHandler}
                    />

                    <button type='submit' >
                        {languages.search[language]} <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SearchForm;
