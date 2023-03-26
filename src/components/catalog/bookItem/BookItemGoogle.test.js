import { render, screen, cleanup } from "@testing-library/react";
import { LanguageContext } from '../../../contexts/LanguageContext';
import { MemoryRouter } from "react-router-dom";
import BookItemGoogle from "./BookItemGoogle";

describe('BookItem component - the image element', () => {

    afterEach(cleanup);

    test('renders the image', () => {
        const book = {
            volumeInfo: {
                imageLinks: {
                    thumbnail: 'http://something'
                },
                title: 'The way of kings',
                authors: ['Brandon Sanderson'],
                categories: ['Fantasy'],
                publishedDate: '2012',
                language: 'en',
                description: 'Great book!'
            }
        };

        render(
            <LanguageContext.Provider value={{
                language: 'english',
                setAppLanguage: () => { }
            }}>
                <MemoryRouter>
                    <BookItemGoogle book={book} />
                </MemoryRouter>
            </LanguageContext.Provider>);

        const imageElement = screen.getByRole('img');
        expect(imageElement).toBeInTheDocument();
        expect(imageElement).toHaveAttribute('src', 'http://something');
    });
    
    test('renders placeholder in case there is no image', () => {
        const book = {
            volumeInfo: {                
                title: 'The way of kings',
                authors: ['Brandon Sanderson'],
                categories: ['Fantasy'],
                publishedDate: '2012',
                language: 'en',
                description: 'Great book!'
            }
        };

        render(
            <LanguageContext.Provider value={{
                language: 'english',
                setAppLanguage: () => { }
            }}>
                <MemoryRouter>
                    <BookItemGoogle book={book} />
                </MemoryRouter>
            </LanguageContext.Provider>);

        const imageElement = screen.getByRole('img');
        expect(imageElement).toBeInTheDocument();
        expect(imageElement).toHaveAttribute('src', 'http://placehold.it/130x180');
    });
});

const book = {
    id: 1,
    volumeInfo: {
        imageLinks: {
            thumbnail: 'http://something'
        },
        title: 'The way of kings',
        authors: ['Brandon Sanderson'],
        categories: ['Fantasy'],
        publishedDate: '2012',
        language: 'en',
        description: 'Great book!'
    }
};

describe('BookItem component', () => {

    afterEach(cleanup);

    test('renders the title', () => {
        render(
            <LanguageContext.Provider value={{
                language: 'english',
                setAppLanguage: () => { }
            }}>
                <MemoryRouter>
                    <BookItemGoogle book={book} />
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
                    <BookItemGoogle book={book} />
                </MemoryRouter>
            </LanguageContext.Provider>);

        const authorElement = screen.getByText('Brandon Sanderson', { exact: true });
        expect(authorElement).toBeInTheDocument();
    });

    test('renders the category', () => {
        render(
            <LanguageContext.Provider value={{
                language: 'english',
                setAppLanguage: () => { }
            }}>
                <MemoryRouter>
                    <BookItemGoogle book={book} />
                </MemoryRouter>
            </LanguageContext.Provider>);

        const categoryElement = screen.getByText('Fantasy', { exact: false });
        expect(categoryElement).toBeInTheDocument();
    });

    test('renders the published date', () => {
        render(
            <LanguageContext.Provider value={{
                language: 'english',
                setAppLanguage: () => { }
            }}>
                <MemoryRouter>
                    <BookItemGoogle book={book} />
                </MemoryRouter>
            </LanguageContext.Provider>);

        const publishedDateElement = screen.getByText('2012', { exact: false });
        expect(publishedDateElement).toBeInTheDocument();
    });

    test('renders the language', () => {
        render(
            <LanguageContext.Provider value={{
                language: 'english',
                setAppLanguage: () => { }
            }}>
                <MemoryRouter>
                    <BookItemGoogle book={book} />
                </MemoryRouter>
            </LanguageContext.Provider>);

        const languageElement = screen.getByText('EN', { exact: false });
        expect(languageElement).toBeInTheDocument();
    });

    test('renders the description', () => {
        render(
            <LanguageContext.Provider value={{
                language: 'english',
                setAppLanguage: () => { }
            }}>
                <MemoryRouter>
                    <BookItemGoogle book={book} />
                </MemoryRouter>
            </LanguageContext.Provider>);

        const languageElement = screen.getByText('Great book!...', { exact: true });
        expect(languageElement).toBeInTheDocument();
    });
});

describe('BookItemGoogle component - add book button EN', () => {

    afterEach(cleanup);

    test('renders Details button in EN', () => {
        render(
            <LanguageContext.Provider value={{
                language: 'english',
                setAppLanguage: () => { }
            }}>
                <MemoryRouter>
                    <BookItemGoogle book={book} />
                </MemoryRouter>
            </LanguageContext.Provider>);

        const detailsButton = screen.getByRole('link', { name: 'Add book' });
        expect(detailsButton).toBeInTheDocument();
        expect(detailsButton.getAttribute('href')).toBe('/1/create');
    });
});

describe('BookItemGoogle component - add book button BG', () => {

    afterEach(cleanup);

    test('renders Details button in EN', () => {
        render(
            <LanguageContext.Provider value={{
                language: 'bulgarian',
                setAppLanguage: () => { }
            }}>
                <MemoryRouter>
                    <BookItemGoogle book={book} />
                </MemoryRouter>
            </LanguageContext.Provider>);

        const detailsButton = screen.getByRole('link', { name: 'Добави книга' });
        expect(detailsButton).toBeInTheDocument();
        expect(detailsButton.getAttribute('href')).toBe('/1/create');
    });
});

