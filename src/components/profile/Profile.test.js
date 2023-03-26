import { render, screen } from "@testing-library/react";
import { AuthContext } from "../../contexts/AuthContext";
import { LanguageContext } from "../../contexts/LanguageContext";
import { MemoryRouter } from "react-router-dom";
import Profile from "./Profile";

const pages = 3;

describe('Profile component', () => {
    test('renders books if request succeeds', async () => {
        const books = [
            {
                _id: 1,
                imageUrl: 'http://something',
                title: 'The way of kings',
                author: 'Brandon Sanderson',
                genre: 'Fantasy',
            },
            {
                _id: 2,
                imageUrl: 'http://somethingElse',
                title: 'Elantris',
                author: 'Brandon Sanderson',
                genre: 'Fantasy',
            }
        ];

        jest.spyOn(global, "fetch").mockImplementation(() =>
            Promise.resolve({
                json: () => Promise.resolve(books, pages)
            })
        );

        render(
            <AuthContext.Provider value={{
                user: { _id: '21323434545675' }
            }}>
                <LanguageContext.Provider value={{
                    language: 'english',
                    setAppLanguage: () => { }
                }}>
                    <MemoryRouter>
                        <Profile />
                    </MemoryRouter>
                </LanguageContext.Provider>
            </AuthContext.Provider>
        );

        const titleElement = await screen.findByText('Elantris', { exact: false });
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
            <AuthContext.Provider value={{
                user: { _id: '21323434545675' }
            }}>
                <LanguageContext.Provider value={{
                    language: 'english',
                    setAppLanguage: () => { }
                }}>
                    <MemoryRouter>
                        <Profile />
                    </MemoryRouter>
                </LanguageContext.Provider>
            </AuthContext.Provider>
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
            <AuthContext.Provider value={{
                user: { _id: '21323434545675' }
            }}>
                <LanguageContext.Provider value={{
                    language: 'bulgarian',
                    setAppLanguage: () => { }
                }}>
                    <MemoryRouter>
                        <Profile />
                    </MemoryRouter>
                </LanguageContext.Provider>
            </AuthContext.Provider>
        );

        const noBooksElement = await screen.findByText('Все още няма книги', { exact: true });
        expect(noBooksElement).toBeInTheDocument();
    });
});