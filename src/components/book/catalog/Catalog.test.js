import { render, screen } from "@testing-library/react";
import { LanguageContext } from "../../contexts/LanguageContext";
import { MemoryRouter } from "react-router-dom";
import Catalog from "./Catalog";

const pages = 3;

describe('Catalog component', () => {    
    test('renders books if request succeeds', async () => {
        const books = [
            {
                _id: 1,
                imageUrl: 'http://something',
                title: 'The way of kings',
                author: 'Brandon Sanderson',
                genre: 'Fantasy',
            }
        ];

        // window.fetch = jest.fn()
        // window.fetch.mockResolvedValueOnce({
        //     json: async () => {books, pages}
        // });

        jest.spyOn(global, "fetch").mockImplementation(() =>
            Promise.resolve({
                json: () => Promise.resolve(books, pages)
            })
        );

        render(
            <LanguageContext.Provider value={{
                language: 'english',
                setAppLanguage: () => { }
            }}>
                <MemoryRouter>
                    <Catalog />
                </MemoryRouter>
            </LanguageContext.Provider>
        );

        const titleElement = await screen.findByText('The way of kings', { exact: false });
        expect(titleElement).toBeInTheDocument();
    });

    test('renders "No books yet" in EN when request returns no books', async () => {       
        const books = [];
        
        jest.spyOn(global, "fetch").mockImplementation(() =>
            Promise.resolve({
                json: () => Promise.resolve(books, pages)
            })
        );

        render(
            <LanguageContext.Provider value={{
                language: 'english',
                setAppLanguage: () => { }
            }}>
                <MemoryRouter>
                    <Catalog />
                </MemoryRouter>
            </LanguageContext.Provider>
        );

        const noBooksElement = await screen.findByText('No books yet', { exact: true });
        expect(noBooksElement).toBeInTheDocument();
    });

    test('renders "Все още няма книги" in BG when request returns no books', async () => {       
        const books = [];
        
        jest.spyOn(global, "fetch").mockImplementation(() =>
            Promise.resolve({
                json: () => Promise.resolve(books, pages)
            })
        );

        render(
            <LanguageContext.Provider value={{
                language: 'bulgarian',
                setAppLanguage: () => { }
            }}>
                <MemoryRouter>
                    <Catalog />
                </MemoryRouter>
            </LanguageContext.Provider>
        );

        const noBooksElement = await screen.findByText('Все още няма книги', { exact: true });
        expect(noBooksElement).toBeInTheDocument();
    });
});