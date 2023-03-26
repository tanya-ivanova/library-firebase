import { render, screen, cleanup } from "@testing-library/react";
import { AuthContext } from "../../contexts/AuthContext";
import { LanguageContext } from "../../contexts/LanguageContext";
import Comment from "./Comment";

describe('Comment component when there are comments', () => {
    afterEach(cleanup);

    test('renders one comment', () => {
        let comments = [
            {
                bookId: 1,
                text: 'my first comment',
                user: {
                    email: 'peter@abv.bg'
                }
            }
        ];

        render(
            <AuthContext.Provider value={{
                user: { email: 'peter@abv.bg' }
            }}>
                <LanguageContext.Provider value={{
                    language: 'english',
                    setAppLanguage: () => { }
                }}>
                    <Comment comments={comments} />
                </LanguageContext.Provider>
            </AuthContext.Provider>
        );

        const commentElement = screen.getByText('my first comment', { exact: false });
        expect(commentElement).toBeInTheDocument();
    });

    test('renders more than one comment', () => {
        let comments = [
            {
                bookId: 1,
                text: 'my first comment',
                user: {
                    email: 'peter@abv.bg'
                }
            },

            {
                bookId: 1,
                text: 'very nice book',
                user: {
                    email: 'tanya@gmail.com'
                }
            }
        ];

        render(
            <AuthContext.Provider value={{
                user: { email: 'peter@abv.bg' }
            }}>
                <LanguageContext.Provider value={{
                    language: 'english',
                    setAppLanguage: () => { }
                }}>
                    <Comment comments={comments} />
                </LanguageContext.Provider>
            </AuthContext.Provider>
        );

        const commentElement = screen.getByText('very nice book', { exact: false });
        expect(commentElement).toBeInTheDocument();
    });
});

describe('Comment component when there are no comments', () => {
    afterEach(cleanup);

    test('renders "No comments" in English', () => {
        let comments = [];

        render(
            <AuthContext.Provider value={{
                user: { email: 'peter@abv.bg' }
            }}>
                <LanguageContext.Provider value={{
                    language: 'english',
                    setAppLanguage: () => { }
                }}>
                    <Comment comments={comments} />
                </LanguageContext.Provider>
            </AuthContext.Provider>
        );

        const commentElement = screen.getByText('No comments', { exact: true });
        expect(commentElement).toBeInTheDocument();
    });

    test('renders "No comments" in Bulgarian', () => {
        let comments = [];

        render(
            <AuthContext.Provider value={{
                user: { email: 'peter@abv.bg' }
            }}>
                <LanguageContext.Provider value={{
                    language: 'bulgarian',
                    setAppLanguage: () => { }
                }}>
                    <Comment comments={comments} />
                </LanguageContext.Provider>
            </AuthContext.Provider>
        );

        const commentElement = screen.getByText('Няма коментари', { exact: true });
        expect(commentElement).toBeInTheDocument();
    });
});

describe('Comment component when there is no logged in user', () => {
    afterEach(cleanup);

    test('does not render the comment form (EN)', () => {
        let comments = [];

        render(
            <AuthContext.Provider value={{
                user: {}
            }}>
                <LanguageContext.Provider value={{
                    language: 'english',
                    setAppLanguage: () => { }
                }}>
                    <Comment comments={comments} />
                </LanguageContext.Provider>
            </AuthContext.Provider>
        );

        const commentFormElement = screen.queryByText('Add comment', { exact: true });
        expect(commentFormElement).toBeNull();
    });

    test('does not render the comment form (BG)', () => {
        let comments = [];

        render(
            <AuthContext.Provider value={{
                user: {}
            }}>
                <LanguageContext.Provider value={{
                    language: 'bulgarian',
                    setAppLanguage: () => { }
                }}>
                    <Comment comments={comments} />
                </LanguageContext.Provider>
            </AuthContext.Provider>
        );

        const commentFormElement = screen.queryByText('Добави коментар', { exact: true });
        expect(commentFormElement).toBeNull();
    });
});

describe('Comment component when there is a logged in user who is the author', () => {
    afterEach(cleanup);

    test('does not render the comment form (EN)', () => {
        let comments = [];

        render(
            <AuthContext.Provider value={{
                user: {
                    email: 'peter@abv.bg',
                    _id: 1
                }
            }}>
                <LanguageContext.Provider value={{
                    language: 'english',
                    setAppLanguage: () => { }
                }}>
                    <Comment comments={comments} isOwner={true} />
                </LanguageContext.Provider>
            </AuthContext.Provider>
        );

        const commentFormElement = screen.queryByText('Add comment:', { exact: true });
        expect(commentFormElement).toBeNull();
    });

    test('does not render the comment form (BG)', () => {
        let comments = [];

        render(
            <AuthContext.Provider value={{
                user: {
                    email: 'peter@abv.bg',
                    _id: 1
                }
            }}>
                <LanguageContext.Provider value={{
                    language: 'bulgarian',
                    setAppLanguage: () => { }
                }}>
                    <Comment comments={comments} isOwner={true} />
                </LanguageContext.Provider>
            </AuthContext.Provider>
        );

        const commentFormElement = screen.queryByText('Добави коментар:', { exact: true });
        expect(commentFormElement).toBeNull();
    });
});

describe('Comment component when there is a logged in user who is not the author', () => {
    afterEach(cleanup);

    test('renders the comment form (EN)', () => {
        let comments = [];

        render(
            <AuthContext.Provider value={{
                user: {
                    email: 'peter@abv.bg',
                    _id: 1
                }
            }}>
                <LanguageContext.Provider value={{
                    language: 'english',
                    setAppLanguage: () => { }
                }}>
                    <Comment comments={comments} />
                </LanguageContext.Provider>
            </AuthContext.Provider>
        );

        const commentFormElement = screen.getByText('Add comment:', { exact: true });
        expect(commentFormElement).toBeInTheDocument();
    });

    test('does not render the comment form (BG)', () => {
        let comments = [];

        render(
            <AuthContext.Provider value={{
                user: {
                    email: 'peter@abv.bg',
                    _id: 1
                }
            }}>
                <LanguageContext.Provider value={{
                    language: 'bulgarian',
                    setAppLanguage: () => { }
                }}>
                    <Comment comments={comments} />
                </LanguageContext.Provider>
            </AuthContext.Provider>
        );

        const commentFormElement = screen.getByText('Добави коментар:', { exact: true });
        expect(commentFormElement).toBeInTheDocument();
    });
});