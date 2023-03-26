import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { AuthContext } from "../../contexts/AuthContext";
import { LanguageContext } from "../../contexts/LanguageContext";
import { MemoryRouter } from "react-router-dom";
import Header from "./Header";

describe('Header component in English when there is no logged in user', () => {
    afterEach(cleanup);

    test('renders "SoftUni Library"', () => {
        render(
            <AuthContext.Provider value={{
                user: {}
            }}>
                <LanguageContext.Provider value={{
                    language: 'english',
                    setAppLanguage: () => { }
                }}>
                    <MemoryRouter>
                        <Header />
                    </MemoryRouter>
                </LanguageContext.Provider>
            </AuthContext.Provider>
        );

        const softuniLibraryElement = screen.getByRole('link', {name: 'SoftUni Library'});
        expect(softuniLibraryElement).toBeInTheDocument();
        expect(softuniLibraryElement.getAttribute('href')).toBe('/');
    });

    test('renders "All books"', () => {
        render(
            <AuthContext.Provider value={{
                user: {}
            }}>
                <LanguageContext.Provider value={{
                    language: 'english',
                    setAppLanguage: () => { }
                }}>
                    <MemoryRouter>
                        <Header />
                    </MemoryRouter>
                </LanguageContext.Provider>
            </AuthContext.Provider>
        );

        const allBooksElement = screen.getByRole('link', {name: 'All books'});
        expect(allBooksElement).toBeInTheDocument();
        expect(allBooksElement.getAttribute('href')).toBe('/catalog');
    });

    test('renders "Login"', () => {
        render(
            <AuthContext.Provider value={{
                user: {}
            }}>
                <LanguageContext.Provider value={{
                    language: 'english',
                    setAppLanguage: () => { }
                }}>
                    <MemoryRouter>
                        <Header />
                    </MemoryRouter>
                </LanguageContext.Provider>
            </AuthContext.Provider>
        );

        const loginElement = screen.getByRole('link', {name: 'Login'});
        expect(loginElement).toBeInTheDocument();
        expect(loginElement.getAttribute('href')).toBe('/login');
    });

    test('renders "Register"', () => {
        render(
            <AuthContext.Provider value={{
                user: {}
            }}>
                <LanguageContext.Provider value={{
                    language: 'english',
                    setAppLanguage: () => { }
                }}>
                    <MemoryRouter>
                        <Header />
                    </MemoryRouter>
                </LanguageContext.Provider>
            </AuthContext.Provider>
        );

        const registerElement = screen.getByRole('link', {name: 'Register'});
        expect(registerElement).toBeInTheDocument();
        expect(registerElement.getAttribute('href')).toBe('/register');
    });

    test('renders "BG" button', () => {
        render(
            <AuthContext.Provider value={{
                user: {}
            }}>
                <LanguageContext.Provider value={{
                    language: 'english',
                    setAppLanguage: () => { }
                }}>
                    <MemoryRouter>
                        <Header />
                    </MemoryRouter>
                </LanguageContext.Provider>
            </AuthContext.Provider>
        );

        const registerElement = screen.getByText('BG');
        expect(registerElement).toBeInTheDocument();        
    });

    test('renders "EN" button', () => {
        render(
            <AuthContext.Provider value={{
                user: {}
            }}>
                <LanguageContext.Provider value={{
                    language: 'english',
                    setAppLanguage: () => { }
                }}>
                    <MemoryRouter>
                        <Header />
                    </MemoryRouter>
                </LanguageContext.Provider>
            </AuthContext.Provider>
        );

        const registerElement = screen.getByText('EN');
        expect(registerElement).toBeInTheDocument();        
    });
});

describe('Header component in Bulgarian when there is no logged in user', () => {
    afterEach(cleanup);

    test('renders "СофтУни Библиотека"', () => {
        render(
            <AuthContext.Provider value={{
                user: {}
            }}>
                <LanguageContext.Provider value={{
                    language: 'bulgarian',
                    setAppLanguage: () => { }
                }}>
                    <MemoryRouter>
                        <Header />
                    </MemoryRouter>
                </LanguageContext.Provider>
            </AuthContext.Provider>
        );

        const softuniLibraryElement = screen.getByRole('link', {name: 'СофтУни Библиотека'});
        expect(softuniLibraryElement).toBeInTheDocument();
        expect(softuniLibraryElement.getAttribute('href')).toBe('/');
    });

    test('renders "Всички книги"', () => {
        render(
            <AuthContext.Provider value={{
                user: {}
            }}>
                <LanguageContext.Provider value={{
                    language: 'bulgarian',
                    setAppLanguage: () => { }
                }}>
                    <MemoryRouter>
                        <Header />
                    </MemoryRouter>
                </LanguageContext.Provider>
            </AuthContext.Provider>
        );

        const allBooksElement = screen.getByRole('link', {name: 'Всички книги'});
        expect(allBooksElement).toBeInTheDocument();
        expect(allBooksElement.getAttribute('href')).toBe('/catalog');
    });

    test('renders "Вход"', () => {
        render(
            <AuthContext.Provider value={{
                user: {}
            }}>
                <LanguageContext.Provider value={{
                    language: 'bulgarian',
                    setAppLanguage: () => { }
                }}>
                    <MemoryRouter>
                        <Header />
                    </MemoryRouter>
                </LanguageContext.Provider>
            </AuthContext.Provider>
        );

        const loginElement = screen.getByRole('link', {name: 'Вход'});
        expect(loginElement).toBeInTheDocument();
        expect(loginElement.getAttribute('href')).toBe('/login');
    });

    test('renders "Регистрирай се"', () => {
        render(
            <AuthContext.Provider value={{
                user: {}
            }}>
                <LanguageContext.Provider value={{
                    language: 'bulgarian',
                    setAppLanguage: () => { }
                }}>
                    <MemoryRouter>
                        <Header />
                    </MemoryRouter>
                </LanguageContext.Provider>
            </AuthContext.Provider>
        );

        const registerElement = screen.getByRole('link', {name: 'Регистрирай се'});
        expect(registerElement).toBeInTheDocument();
        expect(registerElement.getAttribute('href')).toBe('/register');
    });

    test('renders "BG" button', () => {
        render(
            <AuthContext.Provider value={{
                user: {}
            }}>
                <LanguageContext.Provider value={{
                    language: 'bulgarian',
                    setAppLanguage: () => { }
                }}>
                    <MemoryRouter>
                        <Header />
                    </MemoryRouter>
                </LanguageContext.Provider>
            </AuthContext.Provider>
        );

        const registerElement = screen.getByText('BG');
        expect(registerElement).toBeInTheDocument();        
    });

    test('renders "EN" button', () => {
        render(
            <AuthContext.Provider value={{
                user: {}
            }}>
                <LanguageContext.Provider value={{
                    language: 'bulgarian',
                    setAppLanguage: () => { }
                }}>
                    <MemoryRouter>
                        <Header />
                    </MemoryRouter>
                </LanguageContext.Provider>
            </AuthContext.Provider>
        );

        const registerElement = screen.getByText('EN');
        expect(registerElement).toBeInTheDocument();        
    });
});

describe('Header component in English when there is а logged in user', () => {
    afterEach(cleanup);

    test('renders "My books"', () => {
        render(
            <AuthContext.Provider value={{
                user: {
                    accessToken: 'dfdgtrtyhyjkhui564lkh0-=vnbndxfgdf',
                    email: 'peter@abv.bg'
                }
            }}>
                <LanguageContext.Provider value={{
                    language: 'english',
                    setAppLanguage: () => { }
                }}>
                    <MemoryRouter>
                        <Header />
                    </MemoryRouter>
                </LanguageContext.Provider>
            </AuthContext.Provider>
        );

        const myBooksElement = screen.getByRole('link', {name: 'My books'});
        expect(myBooksElement).toBeInTheDocument();
        expect(myBooksElement.getAttribute('href')).toBe('/profile');
    });

    test('renders "Add book"', () => {
        render(
            <AuthContext.Provider value={{
                user: {
                    accessToken: 'dfdgtrtyhyjkhui564lkh0-=vnbndxfgdf',
                    email: 'peter@abv.bg'
                }
            }}>
                <LanguageContext.Provider value={{
                    language: 'english',
                    setAppLanguage: () => { }
                }}>
                    <MemoryRouter>
                        <Header />
                    </MemoryRouter>
                </LanguageContext.Provider>
            </AuthContext.Provider>
        );

        const addBookElement = screen.getByRole('link', {name: 'Add book'});
        expect(addBookElement).toBeInTheDocument();
        expect(addBookElement.getAttribute('href')).toBe('/create');
    });

    test('renders "Search in the site"', () => {
        render(
            <AuthContext.Provider value={{
                user: {
                    accessToken: 'dfdgtrtyhyjkhui564lkh0-=vnbndxfgdf',
                    email: 'peter@abv.bg'
                }
            }}>
                <LanguageContext.Provider value={{
                    language: 'english',
                    setAppLanguage: () => { }
                }}>
                    <MemoryRouter>
                        <Header />
                    </MemoryRouter>
                </LanguageContext.Provider>
            </AuthContext.Provider>
        );

        const searchElement = screen.getByRole('link', {name: 'Search in the site'});
        expect(searchElement).toBeInTheDocument();
        expect(searchElement.getAttribute('href')).toBe('/search');
    });

    test('renders "Search in Google"', () => {
        render(
            <AuthContext.Provider value={{
                user: {
                    accessToken: 'dfdgtrtyhyjkhui564lkh0-=vnbndxfgdf',
                    email: 'peter@abv.bg'
                }
            }}>
                <LanguageContext.Provider value={{
                    language: 'english',
                    setAppLanguage: () => { }
                }}>
                    <MemoryRouter>
                        <Header />
                    </MemoryRouter>
                </LanguageContext.Provider>
            </AuthContext.Provider>
        );

        const searchInGoogleElement = screen.getByRole('link', {name: 'Search in Google'});
        expect(searchInGoogleElement).toBeInTheDocument();
        expect(searchInGoogleElement.getAttribute('href')).toBe('/searchInGoogle');
    });

    test('renders "Logout"', () => {
        render(
            <AuthContext.Provider value={{
                user: {
                    accessToken: 'dfdgtrtyhyjkhui564lkh0-=vnbndxfgdf',
                    email: 'peter@abv.bg'
                }
            }}>
                <LanguageContext.Provider value={{
                    language: 'english',
                    setAppLanguage: () => { }
                }}>
                    <MemoryRouter>
                        <Header />
                    </MemoryRouter>
                </LanguageContext.Provider>
            </AuthContext.Provider>
        );

        const logoutElement = screen.getByRole('link', {name: 'Logout'});
        expect(logoutElement).toBeInTheDocument();
        expect(logoutElement.getAttribute('href')).toBe('/logout');
    });

    test('renders welcome message', () => {
        render(
            <AuthContext.Provider value={{
                user: {
                    accessToken: 'dfdgtrtyhyjkhui564lkh0-=vnbndxfgdf',
                    email: 'peter@abv.bg'
                }
            }}>
                <LanguageContext.Provider value={{
                    language: 'english',
                    setAppLanguage: () => { }
                }}>
                    <MemoryRouter>
                        <Header />
                    </MemoryRouter>
                </LanguageContext.Provider>
            </AuthContext.Provider>
        );

        const welcomeMessage = screen.getByText('Welcome, peter@abv.bg', {exact: true});
        expect(welcomeMessage).toBeInTheDocument();        
    });
});

describe('Header component in Bulgarian when there is а logged in user', () => {
    afterEach(cleanup);

    test('renders "Моите книги"', () => {
        render(
            <AuthContext.Provider value={{
                user: {
                    accessToken: 'dfdgtrtyhyjkhui564lkh0-=vnbndxfgdf',
                    email: 'peter@abv.bg'
                }
            }}>
                <LanguageContext.Provider value={{
                    language: 'bulgarian',
                    setAppLanguage: () => { }
                }}>
                    <MemoryRouter>
                        <Header />
                    </MemoryRouter>
                </LanguageContext.Provider>
            </AuthContext.Provider>
        );

        const myBooksElement = screen.getByRole('link', {name: 'Моите книги'});
        expect(myBooksElement).toBeInTheDocument();
        expect(myBooksElement.getAttribute('href')).toBe('/profile');
    });

    test('renders "Добави книга"', () => {
        render(
            <AuthContext.Provider value={{
                user: {
                    accessToken: 'dfdgtrtyhyjkhui564lkh0-=vnbndxfgdf',
                    email: 'peter@abv.bg'
                }
            }}>
                <LanguageContext.Provider value={{
                    language: 'bulgarian',
                    setAppLanguage: () => { }
                }}>
                    <MemoryRouter>
                        <Header />
                    </MemoryRouter>
                </LanguageContext.Provider>
            </AuthContext.Provider>
        );

        const addBookElement = screen.getByRole('link', {name: 'Добави книга'});
        expect(addBookElement).toBeInTheDocument();
        expect(addBookElement.getAttribute('href')).toBe('/create');
    });

    test('renders "Търсене в сайта"', () => {
        render(
            <AuthContext.Provider value={{
                user: {
                    accessToken: 'dfdgtrtyhyjkhui564lkh0-=vnbndxfgdf',
                    email: 'peter@abv.bg'
                }
            }}>
                <LanguageContext.Provider value={{
                    language: 'bulgarian',
                    setAppLanguage: () => { }
                }}>
                    <MemoryRouter>
                        <Header />
                    </MemoryRouter>
                </LanguageContext.Provider>
            </AuthContext.Provider>
        );

        const searchElement = screen.getByRole('link', {name: 'Търсене в сайта'});
        expect(searchElement).toBeInTheDocument();
        expect(searchElement.getAttribute('href')).toBe('/search');
    });

    test('renders "Търсене в Google"', () => {
        render(
            <AuthContext.Provider value={{
                user: {
                    accessToken: 'dfdgtrtyhyjkhui564lkh0-=vnbndxfgdf',
                    email: 'peter@abv.bg'
                }
            }}>
                <LanguageContext.Provider value={{
                    language: 'bulgarian',
                    setAppLanguage: () => { }
                }}>
                    <MemoryRouter>
                        <Header />
                    </MemoryRouter>
                </LanguageContext.Provider>
            </AuthContext.Provider>
        );

        const searchInGoogleElement = screen.getByRole('link', {name: 'Търсене в Google'});
        expect(searchInGoogleElement).toBeInTheDocument();
        expect(searchInGoogleElement.getAttribute('href')).toBe('/searchInGoogle');
    });

    test('renders "Изход"', () => {
        render(
            <AuthContext.Provider value={{
                user: {
                    accessToken: 'dfdgtrtyhyjkhui564lkh0-=vnbndxfgdf',
                    email: 'peter@abv.bg'
                }
            }}>
                <LanguageContext.Provider value={{
                    language: 'bulgarian',
                    setAppLanguage: () => { }
                }}>
                    <MemoryRouter>
                        <Header />
                    </MemoryRouter>
                </LanguageContext.Provider>
            </AuthContext.Provider>
        );

        const logoutElement = screen.getByRole('link', {name: 'Изход'});
        expect(logoutElement).toBeInTheDocument();
        expect(logoutElement.getAttribute('href')).toBe('/logout');
    });

    test('renders welcome message', () => {
        render(
            <AuthContext.Provider value={{
                user: {
                    accessToken: 'dfdgtrtyhyjkhui564lkh0-=vnbndxfgdf',
                    email: 'peter@abv.bg'
                }
            }}>
                <LanguageContext.Provider value={{
                    language: 'bulgarian',
                    setAppLanguage: () => { }
                }}>
                    <MemoryRouter>
                        <Header />
                    </MemoryRouter>
                </LanguageContext.Provider>
            </AuthContext.Provider>
        );

        const welcomeMessage = screen.getByText('Здравей, peter@abv.bg', {exact: true});
        expect(welcomeMessage).toBeInTheDocument();        
    });
});

describe('Testing the language buttons in Header component', () => {
    afterEach(cleanup);

    test('Click the EN button and check that setAppLanguage was called with "english"', () => {
        const mockSetAppLanguage = jest.fn();

        render(
            <AuthContext.Provider value={{
                user: {
                    accessToken: 'dfdgtrtyhyjkhui564lkh0-=vnbndxfgdf',
                    email: 'peter@abv.bg'
                }
            }}>
                <LanguageContext.Provider value={{
                    language: 'bulgarian',
                    setAppLanguage: mockSetAppLanguage
                }}>
                    <MemoryRouter>
                        <Header />
                    </MemoryRouter>
                </LanguageContext.Provider>
            </AuthContext.Provider>
        );

        const enButton = screen.getByRole('button', {name: 'EN'});
        fireEvent.click(enButton);
        expect(mockSetAppLanguage).toHaveBeenCalledWith('english');
    });

    test('Click the BG button and check that setAppLanguage was called with "bulgarian"', () => {
        const mockSetAppLanguage = jest.fn();

        render(
            <AuthContext.Provider value={{
                user: {
                    accessToken: 'dfdgtrtyhyjkhui564lkh0-=vnbndxfgdf',
                    email: 'peter@abv.bg'
                }
            }}>
                <LanguageContext.Provider value={{
                    language: 'english',
                    setAppLanguage: mockSetAppLanguage
                }}>
                    <MemoryRouter>
                        <Header />
                    </MemoryRouter>
                </LanguageContext.Provider>
            </AuthContext.Provider>
        );

        const enButton = screen.getByRole('button', {name: 'BG'});
        fireEvent.click(enButton);
        expect(mockSetAppLanguage).toHaveBeenCalledWith('bulgarian');
    });
});