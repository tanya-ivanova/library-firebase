/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen, cleanup, fireEvent, waitFor, act } from "@testing-library/react";
import { AuthContext } from "../../contexts/AuthContext";
import { LanguageContext } from "../../contexts/LanguageContext";
import { MemoryRouter, BrowserRouter } from "react-router-dom";
import BookDetails from "./BookDetails";
import * as bookService from '../../services/bookService';
import * as likeService from '../../services/likeService';
import * as commentService from '../../services/commentService';

describe('BookDetails component', () => {
    const mockBook = {
        _id: 1,
        _ownerId: '234',
        imageUrl: 'http://something',
        title: 'The way of kings',
        author: 'Brandon Sanderson',
        genre: 'Fantasy',
        year: '2012',
        summary: 'Great book!'
    };
    const mockTotalLikes = 2;
    const mockIsLiked = false;
    const mockComments = [];

    beforeEach(() => {
        jest.spyOn(bookService, "getOne").mockResolvedValue(mockBook);
        jest.spyOn(likeService, "getTotalLikesByBookId").mockResolvedValue(mockTotalLikes);
        jest.spyOn(likeService, "getMyLikeByBookId").mockResolvedValue(mockIsLiked);
        jest.spyOn(commentService, "getByBookId").mockResolvedValue(mockComments);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    afterEach(cleanup);

    test('renders the image', async () => {
        await act(async () => {
            render(
                <AuthContext.Provider value={{
                    user: { _id: '456' }
                }}>
                    <LanguageContext.Provider value={{
                        language: 'english',
                        setAppLanguage: () => { }
                    }}>
                        <MemoryRouter>
                            <BookDetails />
                        </MemoryRouter>
                    </LanguageContext.Provider>
                </AuthContext.Provider>
            );
        })

        const imageElement = await screen.findByAltText('The way of kings');
        await waitFor(() => expect(imageElement).toBeInTheDocument());
        await waitFor(() => expect(imageElement).toHaveAttribute('src', 'http://something'));
    });

    test('renders the title', async () => {
        await act(async () => {
            render(
                <AuthContext.Provider value={{
                    user: { _id: '456' }
                }}>
                    <LanguageContext.Provider value={{
                        language: 'english',
                        setAppLanguage: () => { }
                    }}>
                        <MemoryRouter>
                            <BookDetails />
                        </MemoryRouter>
                    </LanguageContext.Provider>
                </AuthContext.Provider>
            );
        })

        const titleElement = await screen.findByText('The way of kings', { exact: true });
        await waitFor(() => expect(titleElement).toBeInTheDocument());
    });

    test('renders the author', async () => {
        await act(async () => {
            render(
                <AuthContext.Provider value={{
                    user: { _id: '456' }
                }}>
                    <LanguageContext.Provider value={{
                        language: 'english',
                        setAppLanguage: () => { }
                    }}>
                        <MemoryRouter>
                            <BookDetails />
                        </MemoryRouter>
                    </LanguageContext.Provider>
                </AuthContext.Provider>
            );
        })

        const authorElement = await screen.findByText('Brandon Sanderson', { exact: true });
        await waitFor(() => expect(authorElement).toBeInTheDocument());
    });

    test('renders the genre', async () => {
        await act(async () => {
            render(
                <AuthContext.Provider value={{
                    user: { _id: '456' }
                }}>
                    <LanguageContext.Provider value={{
                        language: 'english',
                        setAppLanguage: () => { }
                    }}>
                        <MemoryRouter>
                            <BookDetails />
                        </MemoryRouter>
                    </LanguageContext.Provider>
                </AuthContext.Provider>
            );
        })

        const genreElement = await screen.findByText('Fantasy', { exact: false });
        await waitFor(() => expect(genreElement).toBeInTheDocument());
    });

    test('renders the year', async () => {
        await act(async () => {
            render(
                <AuthContext.Provider value={{
                    user: { _id: '456' }
                }}>
                    <LanguageContext.Provider value={{
                        language: 'english',
                        setAppLanguage: () => { }
                    }}>
                        <MemoryRouter>
                            <BookDetails />
                        </MemoryRouter>
                    </LanguageContext.Provider>
                </AuthContext.Provider>
            );
        })

        const yearElement = await screen.findByText('2012', { exact: false });
        await waitFor(() => expect(yearElement).toBeInTheDocument());
    });

    test('renders the summary', async () => {
        await act(async () => {
            render(
                <AuthContext.Provider value={{
                    user: { _id: '456' }
                }}>
                    <LanguageContext.Provider value={{
                        language: 'english',
                        setAppLanguage: () => { }
                    }}>
                        <MemoryRouter>
                            <BookDetails />
                        </MemoryRouter>
                    </LanguageContext.Provider>
                </AuthContext.Provider>
            );
        })

        const summaryElement = await screen.findByText('Great book!', { exact: false });
        await waitFor(() => expect(summaryElement).toBeInTheDocument());
    });
});

describe('BookDetails component - parsing the summary', () => {
    const mockBook = {
        _id: 1,
        _ownerId: '234',
        imageUrl: 'http://something',
        title: 'The way of kings',
        author: 'Brandon Sanderson',
        genre: 'Fantasy',
        year: '2012',
        summary: '<p>Great book!</p>'
    };
    const mockTotalLikes = 2;
    const mockIsLiked = false;
    const mockComments = [];

    beforeEach(() => {
        jest.spyOn(bookService, "getOne").mockResolvedValue(mockBook);
        jest.spyOn(likeService, "getTotalLikesByBookId").mockResolvedValue(mockTotalLikes);
        jest.spyOn(likeService, "getMyLikeByBookId").mockResolvedValue(mockIsLiked);
        jest.spyOn(commentService, "getByBookId").mockResolvedValue(mockComments);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    afterEach(cleanup);

    test('parse the summary and renders it', async () => {
        await act(async () => {
            render(
                <AuthContext.Provider value={{
                    user: { _id: '456' }
                }}>
                    <LanguageContext.Provider value={{
                        language: 'english',
                        setAppLanguage: () => { }
                    }}>
                        <MemoryRouter>
                            <BookDetails />
                        </MemoryRouter>
                    </LanguageContext.Provider>
                </AuthContext.Provider>
            );
        })

        const summaryElement = await screen.findByText('Great book!', { exact: false });
        await waitFor(() => expect(summaryElement).toBeInTheDocument());
    });
});

describe('BookDetails component - testing the author link', () => {
    const mockBook = {
        _id: 1,
        _ownerId: '234',
        imageUrl: 'http://something',
        title: 'The way of kings',
        author: 'Brandon Sanderson',
        genre: 'Fantasy',
        year: '2012',
        summary: '<p>Great book!</p>'
    };
    const mockTotalLikes = 2;
    const mockIsLiked = false;
    const mockComments = [];

    beforeEach(() => {
        jest.spyOn(bookService, "getOne").mockResolvedValue(mockBook);
        jest.spyOn(likeService, "getTotalLikesByBookId").mockResolvedValue(mockTotalLikes);
        jest.spyOn(likeService, "getMyLikeByBookId").mockResolvedValue(mockIsLiked);
        jest.spyOn(commentService, "getByBookId").mockResolvedValue(mockComments);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    afterEach(cleanup);

    test('renders the author link in EN', async () => {
        await act(async () => {
            render(
                <AuthContext.Provider value={{
                    user: { _id: '456' }
                }}>
                    <LanguageContext.Provider value={{
                        language: 'english',
                        setAppLanguage: () => { }
                    }}>
                        <BrowserRouter>
                            <BookDetails />
                        </BrowserRouter>
                    </LanguageContext.Provider>
                </AuthContext.Provider>
            );
        })

        const authorLink = await screen.findByText('here', { exact: false });
        await waitFor(() => expect(authorLink).toBeInTheDocument());
        await waitFor(() => expect(authorLink.getAttribute('href')).toBe('/searchInGoogle?query=Brandon-Sanderson?searchBy=author'));
    });

    test('renders the author link in BG', async () => {
        await act(async () => {
            render(
                <AuthContext.Provider value={{
                    user: { _id: '456' }
                }}>
                    <LanguageContext.Provider value={{
                        language: 'bulgarian',
                        setAppLanguage: () => { }
                    }}>
                        <BrowserRouter>
                            <BookDetails />
                        </BrowserRouter>
                    </LanguageContext.Provider>
                </AuthContext.Provider>
            );
        })

        const authorLink = await screen.findByText('тук', { exact: false });
        await waitFor(() => expect(authorLink).toBeInTheDocument());
        await waitFor(() => expect(authorLink.getAttribute('href')).toBe('/searchInGoogle?query=Brandon-Sanderson?searchBy=author'));
    });
});

describe('BookDetails component - testing Delete and Edit buttons when the user is the owner', () => {

    const mockBook = {
        _id: 1,
        _ownerId: '234',
        imageUrl: 'http://something',
        title: 'The way of kings',
        author: 'Brandon Sanderson',
        genre: 'Fantasy',
        year: '2012',
        summary: '<p>Great book!</p>'
    };
    const mockTotalLikes = 2;
    const mockIsLiked = false;
    const mockComments = [];

    beforeEach(() => {
        jest.spyOn(bookService, "getOne").mockResolvedValue(mockBook);
        jest.spyOn(likeService, "getTotalLikesByBookId").mockResolvedValue(mockTotalLikes);
        jest.spyOn(likeService, "getMyLikeByBookId").mockResolvedValue(mockIsLiked);
        jest.spyOn(commentService, "getByBookId").mockResolvedValue(mockComments);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    afterEach(cleanup);

    test('renders the edit button in EN', async () => {
        await act(async () => {
            render(
                <AuthContext.Provider value={{
                    user: { _id: '234' }
                }}>
                    <LanguageContext.Provider value={{
                        language: 'english',
                        setAppLanguage: () => { }
                    }}>
                        <BrowserRouter>
                            <BookDetails />
                        </BrowserRouter>
                    </LanguageContext.Provider>
                </AuthContext.Provider>
            );
        })

        const editButton = await screen.findByText('Edit', { exact: true });
        await waitFor(() => expect(editButton).toBeInTheDocument());
        await waitFor(() => expect(editButton.getAttribute('href')).toBe('/catalog/1/edit'));
    });

    test('renders the edit button in BG', async () => {
        await act(async () => {
            render(
                <AuthContext.Provider value={{
                    user: { _id: '234' }
                }}>
                    <LanguageContext.Provider value={{
                        language: 'bulgarian',
                        setAppLanguage: () => { }
                    }}>
                        <BrowserRouter>
                            <BookDetails />
                        </BrowserRouter>
                    </LanguageContext.Provider>
                </AuthContext.Provider>
            );
        })

        const editButton = await screen.findByText('Промени', { exact: true });
        await waitFor(() => expect(editButton).toBeInTheDocument());
        await waitFor(() => expect(editButton.getAttribute('href')).toBe('/catalog/1/edit'));
    });

    test('renders the delete button in EN', async () => {
        await act(async () => {
            render(
                <AuthContext.Provider value={{
                    user: { _id: '234' }
                }}>
                    <LanguageContext.Provider value={{
                        language: 'english',
                        setAppLanguage: () => { }
                    }}>
                        <BrowserRouter>
                            <BookDetails />
                        </BrowserRouter>
                    </LanguageContext.Provider>
                </AuthContext.Provider>
            );
        })

        const deleteButton = await screen.findByText('Delete', { exact: true });
        await waitFor(() => expect(deleteButton).toBeInTheDocument());
    });

    test('renders the delete button in BG', async () => {
        await act(async() => {
            render(
                <AuthContext.Provider value={{
                    user: { _id: '234' }
                }}>
                    <LanguageContext.Provider value={{
                        language: 'bulgarian',
                        setAppLanguage: () => { }
                    }}>
                        <BrowserRouter>
                            <BookDetails />
                        </BrowserRouter>
                    </LanguageContext.Provider>
                </AuthContext.Provider>
            );
        })

        const deleteButton = await screen.findByText('Изтрий', { exact: true });
        await waitFor(() => expect(deleteButton).toBeInTheDocument());
    });
});

describe('BookDetails component - testing Delete and Edit buttons when the user is not the owner', () => {

    const mockBook = {
        _id: 1,
        _ownerId: '234',
        imageUrl: 'http://something',
        title: 'The way of kings',
        author: 'Brandon Sanderson',
        genre: 'Fantasy',
        year: '2012',
        summary: '<p>Great book!</p>'
    };
    const mockTotalLikes = 2;
    const mockIsLiked = false;
    const mockComments = [];

    beforeEach(() => {
        jest.spyOn(bookService, "getOne").mockResolvedValue(mockBook);
        jest.spyOn(likeService, "getTotalLikesByBookId").mockResolvedValue(mockTotalLikes);
        jest.spyOn(likeService, "getMyLikeByBookId").mockResolvedValue(mockIsLiked);
        jest.spyOn(commentService, "getByBookId").mockResolvedValue(mockComments);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    afterEach(cleanup);

    test('does not render the edit button in EN', async () => {
        await act(async() => {
            render(
                <AuthContext.Provider value={{
                    user: { _id: '122' }
                }}>
                    <LanguageContext.Provider value={{
                        language: 'english',
                        setAppLanguage: () => { }
                    }}>
                        <BrowserRouter>
                            <BookDetails />
                        </BrowserRouter>
                    </LanguageContext.Provider>
                </AuthContext.Provider>
            );
        })

        const editButton = screen.queryByText('Edit', { exact: true });
        await waitFor(() => expect(editButton).toBeNull());
    });

    test('does not render the edit button in BG', async () => {
        await act(async() => {
            render(
                <AuthContext.Provider value={{
                    user: { _id: '122' }
                }}>
                    <LanguageContext.Provider value={{
                        language: 'bulgarian',
                        setAppLanguage: () => { }
                    }}>
                        <BrowserRouter>
                            <BookDetails />
                        </BrowserRouter>
                    </LanguageContext.Provider>
                </AuthContext.Provider>
            );
        })

        const editButton = screen.queryByText('Промени', { exact: true });
        await waitFor(() => expect(editButton).toBeNull());
    });

    test('does not render the delete button in EN', async () => {
        await act(async() => {
            render(
                <AuthContext.Provider value={{
                    user: { _id: '122' }
                }}>
                    <LanguageContext.Provider value={{
                        language: 'english',
                        setAppLanguage: () => { }
                    }}>
                        <BrowserRouter>
                            <BookDetails />
                        </BrowserRouter>
                    </LanguageContext.Provider>
                </AuthContext.Provider>
            );
        })

        const deleteButton = screen.queryByText('Delete', { exact: true });
        await waitFor(() => expect(deleteButton).toBeNull());
    });

    test('does not render the delete button in BG', async () => {
        await act(async() => {
            render(
                <AuthContext.Provider value={{
                    user: { _id: '122' }
                }}>
                    <LanguageContext.Provider value={{
                        language: 'english',
                        setAppLanguage: () => { }
                    }}>
                        <BrowserRouter>
                            <BookDetails />
                        </BrowserRouter>
                    </LanguageContext.Provider>
                </AuthContext.Provider>
            );
        })

        const deleteButton = screen.queryByText('Промени', { exact: true });
        await waitFor(() => expect(deleteButton).toBeNull());
    });
});
