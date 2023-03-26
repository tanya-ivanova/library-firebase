import { render, screen, cleanup } from "@testing-library/react";
import { LanguageContext } from "../../contexts/LanguageContext";
import Like from "./Like";

describe('Like component EN', () => {
    afterEach(cleanup);

    test('renders "LIKES: 2" in EN when total likes are 2', () => {
        const totalLikes = 2;
        const isLiked = false;
        render(
            <LanguageContext.Provider value={{
                language: 'english',          
                setAppLanguage: () => {}          
            }}>
                <Like totalLikes={totalLikes} isLiked={isLiked} />
            </LanguageContext.Provider>);

        const totalLikesElement = screen.getByText('LIKES: 2', { exact: false });
        expect(totalLikesElement).toBeInTheDocument();
    });

    test('renders "You already liked this book!" in EN when you liked the book', () => {
        const totalLikes = 2;
        const isLiked = true;
        render(
            <LanguageContext.Provider value={{
                language: 'english',          
                setAppLanguage: () => {}          
            }}>
                <Like totalLikes={totalLikes} isLiked={isLiked} />
            </LanguageContext.Provider>);

        const alreadyLikedElement = screen.getByText('You already liked this book!', { exact: false });
        expect(alreadyLikedElement).toBeInTheDocument();
    });

    test('does not render "You already liked this book!" in EN when you did not like the book', () => {
        const totalLikes = 2;
        const isLiked = false;
        render(
            <LanguageContext.Provider value={{
                language: 'english',          
                setAppLanguage: () => {}          
            }}>
                <Like totalLikes={totalLikes} isLiked={isLiked} />
            </LanguageContext.Provider>);

        const alreadyLikedElement = screen.queryByText('You already liked this book!', { exact: false });
        expect(alreadyLikedElement).toBeNull();
    });
});

describe('Like component BG', () => {
    afterEach(cleanup);

    test('renders "LIKES: 2" in BG when total likes are 2', () => {
        const totalLikes = 2;
        const isLiked = false;
        render(
            <LanguageContext.Provider value={{
                language: 'bulgarian',          
                setAppLanguage: () => {}          
            }}>
                <Like totalLikes={totalLikes} isLiked={isLiked} />
            </LanguageContext.Provider>);

        const totalLikesElement = screen.getByText('ХАРЕСВАНИЯ: 2', { exact: false });
        expect(totalLikesElement).toBeInTheDocument();
    });

    test('renders "You already liked this book!" in BG when you liked the book', () => {
        const totalLikes = 2;
        const isLiked = true;
        render(
            <LanguageContext.Provider value={{
                language: 'bulgarian',          
                setAppLanguage: () => {}          
            }}>
                <Like totalLikes={totalLikes} isLiked={isLiked} />
            </LanguageContext.Provider>);

        const alreadyLikedElement = screen.getByText('Вече харесахте тази книга!', { exact: false });
        expect(alreadyLikedElement).toBeInTheDocument();
    });

    test('does not render "You already liked this book!" in BG when you did not like the book', () => {
        const totalLikes = 2;
        const isLiked = false;
        render(
            <LanguageContext.Provider value={{
                language: 'bulgarian',          
                setAppLanguage: () => {}          
            }}>
                <Like totalLikes={totalLikes} isLiked={isLiked} />
            </LanguageContext.Provider>);

        const alreadyLikedElement = screen.queryByText('Вече харесахте тази книга!', { exact: false });
        expect(alreadyLikedElement).toBeNull();
    });
});
