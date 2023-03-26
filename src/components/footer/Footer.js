import { useContext } from "react";
import { LanguageContext } from "../../contexts/LanguageContext";
import {languages} from '../../languages/languages';
import styles from './Footer.module.css';

const Footer = () => {
    const {language} = useContext(LanguageContext);

    return (
        <footer className={styles.footer}>
            <p>© 2023 {languages.softuniLibrary[language]}</p>
            <p>{languages.createdBy[language]}</p>
        </footer>
    );
}

export default Footer;
