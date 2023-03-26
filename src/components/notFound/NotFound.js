import { useContext } from "react";
import { LanguageContext } from "../../contexts/LanguageContext";
import {languages} from '../../languages/languages';


const NotFound = () => {
    const {language} = useContext(LanguageContext);

    return (
        <h2 className="message-when-no-data">{languages.error404[language]}</h2>
    );
};

export default NotFound;
