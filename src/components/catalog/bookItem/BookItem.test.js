import { render, screen, cleanup } from "@testing-library/react";
import { LanguageContext } from '../../../contexts/LanguageContext';
import { MemoryRouter } from "react-router-dom";
import BookItem from "./BookItem";

const book = {
    _id: 1,
    imageUrl: 'http://something',
    title: 'The way of kings',
    author: 'Brandon Sanderson',
    genre: 'Fantasy',
};

describe('BookItem component', () => {

    afterEach(cleanup);

    test('renders the image', () => {
        render(
            <LanguageContext.Provider value={{
                language: 'english',
                setAppLanguage: () => { }
            }}>
                <MemoryRouter>
                    <BookItem book={book} />
                </MemoryRouter>
            </LanguageContext.Provider>);

        const imageElement = screen.getByRole('img');
        expect(imageElement).toBeInTheDocument();
        expect(imageElement).toHaveAttribute('src', 'http://something');
    });

    test('renders the title', () => {
        render(
            <LanguageContext.Provider value={{
                language: 'english',
                setAppLanguage: () => { }
            }}>
                <MemoryRouter>
                    <BookItem book={book} />
                </MemoryRouter>
            </LanguageContext.Provider>);

        const titleElement = screen.getByText('The way of kings', { exact: true });
        expect(titleElement).toBeInTheDocument();
    });

    test('renders the author', () => {
        render(
            <LanguageContext.Provider value={{
                language: 'english',
                setAppLanguage: () => { }
            }}>
                <MemoryRouter>
                    <BookItem book={book} />
                </MemoryRouter>
            </LanguageContext.Provider>);

        const authorElement = screen.getByText('Brandon Sanderson', { exact: true });
        expect(authorElement).toBeInTheDocument();
    });

    test('renders the genre', () => {
        render(
            <LanguageContext.Provider value={{
                language: 'english',
                setAppLanguage: () => { }
            }}>
                <MemoryRouter>
                    <BookItem book={book} />
                </MemoryRouter>
            </LanguageContext.Provider>);

        const genreElement = screen.getByText('Fantasy', { exact: true });
        expect(genreElement).toBeInTheDocument();
    });
});

describe('BookItem component - details button EN', () => {

    afterEach(cleanup);

    test('renders Details button in EN', () => {
        render(
            <LanguageContext.Provider value={{
                language: 'english',
                setAppLanguage: () => { }
            }}>
                <MemoryRouter>
                    <BookItem book={book} />
                </MemoryRouter>
            </LanguageContext.Provider>);

        const detailsButton = screen.getByRole('link', { name: 'Details' });
        expect(detailsButton).toBeInTheDocument();
        expect(detailsButton.getAttribute('href')).toBe('/catalog/1/details');
    });
});

describe('BookItem component - details button BG', () => {

    afterEach(cleanup);

    test('renders Details button in EN', () => {
        render(
            <LanguageContext.Provider value={{
                language: 'bulgarian',
                setAppLanguage: () => { }
            }}>
                <MemoryRouter>
                    <BookItem book={book} />
                </MemoryRouter>
            </LanguageContext.Provider>);

        const detailsButton = screen.getByRole('link', { name: 'Детайли' });
        expect(detailsButton).toBeInTheDocument();
        expect(detailsButton.getAttribute('href')).toBe('/catalog/1/details');
    });
});
