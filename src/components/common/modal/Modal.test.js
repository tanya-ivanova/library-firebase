import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { LanguageContext } from "../../../contexts/LanguageContext";
import Modal from "./Modal";

const text = 'modal message';
const onClose = jest.fn();
const onConfirm = jest.fn();

describe('Modal component', () => {
    afterEach(cleanup);

    test('renders the text given via the props', () => {
        render(
            <LanguageContext.Provider value={{
                language: 'english',
                setAppLanguage: () => { }
            }}>
                <Modal text={text} onClose={onClose} onConfirm={onConfirm} />
            </LanguageContext.Provider>
        );

        const textElement = screen.getByText('modal message');
        expect(textElement).toBeInTheDocument();
    });
});

describe('Modal component - EN', () => {
    afterEach(cleanup);

    test('renders the button Cancel in EN', () => {
        render(
            <LanguageContext.Provider value={{
                language: 'english',
                setAppLanguage: () => { }
            }}>
                <Modal text={text} onClose={onClose} onConfirm={onConfirm} />
            </LanguageContext.Provider>
        );

        const cancelButton = screen.getByRole('button', { name: 'Cancel' });
        expect(cancelButton).toBeInTheDocument();
    });

    test('renders the button Confirm in EN', () => {
        render(
            <LanguageContext.Provider value={{
                language: 'english',
                setAppLanguage: () => { }
            }}>
                <Modal text={text} onClose={onClose} onConfirm={onConfirm} />
            </LanguageContext.Provider>
        );

        const confirmButton = screen.getByRole('button', { name: 'Confirm' });
        expect(confirmButton).toBeInTheDocument();
    });
});

describe('Modal component - BG', () => {
    afterEach(cleanup);

    test('renders the button Cancel in BG', () => {
        render(
            <LanguageContext.Provider value={{
                language: 'bulgarian',
                setAppLanguage: () => { }
            }}>
                <Modal text={text} onClose={onClose} onConfirm={onConfirm} />
            </LanguageContext.Provider>
        );

        const cancelButton = screen.getByRole('button', { name: 'Отмени' });
        expect(cancelButton).toBeInTheDocument();
    });

    test('renders the button Confirm in BG', () => {
        render(
            <LanguageContext.Provider value={{
                language: 'bulgarian',
                setAppLanguage: () => { }
            }}>
                <Modal text={text} onClose={onClose} onConfirm={onConfirm} />
            </LanguageContext.Provider>
        );

        const confirmButton = screen.getByRole('button', { name: 'Потвърди' });
        expect(confirmButton).toBeInTheDocument();
    });
});

describe('Testing the buttons in Modal component', () => {
    afterEach(cleanup);

    test('The Cancel button', () => {
        render(
            <LanguageContext.Provider value={{
                language: 'english',
                setAppLanguage: () => { }
            }}>
                <Modal text={text} onClose={onClose} onConfirm={onConfirm} />
            </LanguageContext.Provider>
        );

        const cancelButton = screen.getByRole('button', { name: 'Cancel' });
        fireEvent.click(cancelButton);
        expect(onClose).toHaveBeenCalled();
    });

    test('The Confirm button', () => {
        render(
            <LanguageContext.Provider value={{
                language: 'english',
                setAppLanguage: () => { }
            }}>
                <Modal text={text} onClose={onClose} onConfirm={onConfirm} />
            </LanguageContext.Provider>
        );

        const confirmButton = screen.getByRole('button', { name: 'Confirm' });
        fireEvent.click(confirmButton);
        expect(onConfirm).toHaveBeenCalled();
    });
});