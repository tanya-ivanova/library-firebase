import { render, screen, cleanup } from "@testing-library/react";
import { LanguageContext } from "../../contexts/LanguageContext";
import NotFound from "./NotFound";

describe('NotFound component EN', () => {
    afterEach(cleanup);

    test('renders "Eror 404 Not Found" in English', () => {
        render(
            <LanguageContext.Provider value={{
                language: 'english',          
                setAppLanguage: () => {}          
            }}>
                <NotFound />
            </LanguageContext.Provider>);

        const notFoundElement = screen.getByText('Eror 404 Not Found', { exact: true });
        expect(notFoundElement).toBeInTheDocument();
    });
});

describe('NotFound component BG', () => {
    afterEach(cleanup);

    test('renders "Грешка 404 Не е намерено" in Bulgarian', () => {
        render(
            <LanguageContext.Provider value={{
                language: 'bulgarian',          
                setAppLanguage: () => {}          
            }}>
                <NotFound />
            </LanguageContext.Provider>);

        const notFoundElement = screen.getByText('Грешка 404 Не е намерено', { exact: true });
        expect(notFoundElement).toBeInTheDocument();
    });
});