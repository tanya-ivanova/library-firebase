import { createContext, useState } from "react";

export const LanguageContext = createContext();

export const LanguageProvider = ({
    children
}) => {
    const [language, setLanguage] = useState('english');

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
