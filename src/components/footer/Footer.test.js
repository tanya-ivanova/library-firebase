import { render, screen, cleanup } from "@testing-library/react";
import { LanguageContext } from "../../contexts/LanguageContext";
import Footer from "./Footer";

describe('Footer component EN', () => {
    afterEach(cleanup);

    test('renders "2023 SoftUni Library" as English text', () => {
        render(
            <LanguageContext.Provider value={{
                language: 'english',          
                setAppLanguage: () => {}          
            }}>
                <Footer />
            </LanguageContext.Provider>);

        const softuniLibraryElement = screen.getByText('2023 SoftUni Library', { exact: false });
        expect(softuniLibraryElement).toBeInTheDocument();
    });

    test('Created by Tanya Ivanova" as English text', () => {
        render(
            <LanguageContext.Provider value={{
                language: 'english',          
                setAppLanguage: () => {}          
            }}>
                <Footer />
            </LanguageContext.Provider>);        
        
        const creatorElement = screen.getByText('Created by Tanya Ivanova', { exact: true });
        expect(creatorElement).toBeInTheDocument();
    });
});

describe('Footer component BG', () => {
    afterEach(cleanup);

    test('renders "2023 СофтУни Библиотека" as Bulgarian text', () => {
        render(
            <LanguageContext.Provider value={{
                language: 'bulgarian',          
                setAppLanguage: () => {}          
            }}>
                <Footer />
            </LanguageContext.Provider>);
        
        const softuniLibraryElement = screen.getByText('2023 СофтУни Библиотека', { exact: false });
        expect(softuniLibraryElement).toBeInTheDocument();
    });

    test('Създател Таня Иванова" as Bulgarian text', () => {
        render(
            <LanguageContext.Provider value={{
                language: 'bulgarian',          
                setAppLanguage: () => {}          
            }}>
                <Footer />
            </LanguageContext.Provider>);

        const creatorElement = screen.getByText('Създател Таня Иванова', { exact: true });
        expect(creatorElement).toBeInTheDocument();
    });
});