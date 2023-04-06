import { createContext, useState } from "react";

import {ENGLISH_LANGUAGE} from '../constants';

export const LanguageContext = createContext();

export const LanguageProvider = ({
    children
}) => {
    const [language, setLanguage] = useState(ENGLISH_LANGUAGE);

    const setAppLanguage = (lang) => {
        setLanguage(lang);
    };    

    return (
        <LanguageContext.Provider value={{
            language,            
            setAppLanguage          
        }}>
            {children}
        </LanguageContext.Provider>
    );
}
