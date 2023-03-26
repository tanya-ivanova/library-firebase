import { render, screen, cleanup } from "@testing-library/react";
import { LanguageContext } from "../../../contexts/LanguageContext";
import { MemoryRouter } from "react-router-dom";
import Pager from "./Pager";

const page = 2;
const pages = 3;

describe('Pager component EN', () => {
    afterEach(cleanup);

    test('renders "Page 2 of 3"', () => {
        render(
            <LanguageContext.Provider value={{
                language: 'english',
                setAppLanguage: () => { }
            }}>
                <MemoryRouter>
                    <Pager page={page} pages={pages} />
                </MemoryRouter>
            </LanguageContext.Provider>
        );

        const pagesElement = screen.getByText('Page 2 of 3', {exact: true});
        expect(pagesElement).toBeInTheDocument();        
    });

    test('renders Prev link - EN', () => {
        render(
            <LanguageContext.Provider value={{
                language: 'english',
                setAppLanguage: () => { }
            }}>
                <MemoryRouter>
                    <Pager page={page} pages={pages} />
                </MemoryRouter>
            </LanguageContext.Provider>
        );

        const prevLink = screen.getByText('Prev', {exact: false});
        expect(prevLink).toBeInTheDocument();
        expect(prevLink.getAttribute('href')).toBe('/?page=1');        
    });

    test('renders Next link - EN', () => {
        render(
            <LanguageContext.Provider value={{
                language: 'english',
                setAppLanguage: () => { }
            }}>
                <MemoryRouter>
                    <Pager page={page} pages={pages} />
                </MemoryRouter>
            </LanguageContext.Provider>
        );

        const nextLink = screen.getByText('Next', {exact: false});
        expect(nextLink).toBeInTheDocument();
        expect(nextLink.getAttribute('href')).toBe('/?page=3');        
    });
});

describe('Pager component BG', () => {
    afterEach(cleanup);

    test('renders "Страница 2 от 3"', () => {
        render(
            <LanguageContext.Provider value={{
                language: 'bulgarian',
                setAppLanguage: () => { }
            }}>
                <MemoryRouter>
                    <Pager page={page} pages={pages} />
                </MemoryRouter>
            </LanguageContext.Provider>
        );

        const pagesElement = screen.getByText('Страница 2 от 3', {exact: true});
        expect(pagesElement).toBeInTheDocument();        
    });

    test('renders Prev link - BG', () => {
        render(
            <LanguageContext.Provider value={{
                language: 'bulgarian',
                setAppLanguage: () => { }
            }}>
                <MemoryRouter>
                    <Pager page={page} pages={pages} />
                </MemoryRouter>
            </LanguageContext.Provider>
        );

        const prevLink = screen.getByText('Предишна', {exact: false});
        expect(prevLink).toBeInTheDocument();
        expect(prevLink.getAttribute('href')).toBe('/?page=1');        
    });

    test('renders Next link - BG', () => {
        render(
            <LanguageContext.Provider value={{
                language: 'bulgarian',
                setAppLanguage: () => { }
            }}>
                <MemoryRouter>
                    <Pager page={page} pages={pages} />
                </MemoryRouter>
            </LanguageContext.Provider>
        );

        const nextLink = screen.getByText('Следваща', {exact: false});
        expect(nextLink).toBeInTheDocument();
        expect(nextLink.getAttribute('href')).toBe('/?page=3');        
    });
});