import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from "../../contexts/AuthContext";
import { LanguageContext } from "../../contexts/LanguageContext";
import Login from './Login';

describe('Login component', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    test('Login form renders correctly', () => {
        const mockLogin = jest.fn();

        render(
            <AuthContext.Provider value={{ userLogin: mockLogin }} >
                <LanguageContext.Provider value={{
                    language: 'english',
                    setAppLanguage: () => { }
                }}>
                    <BrowserRouter>
                        <Login />
                    </BrowserRouter>
                </LanguageContext.Provider>
            </AuthContext.Provider>
        );

        const emailInput = screen.getByLabelText('Email');
        const passwordInput = screen.getByLabelText('Password');
        const submitButton = screen.getByRole('button', { name: 'Login' });

        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
    });

    test('Displays error message if fields are empty on submit', async () => {
        render(
            <AuthContext.Provider value={{ userLogin: () => {} }} >
                <LanguageContext.Provider value={{
                    language: 'english',
                    setAppLanguage: () => { }
                }}>
                    <BrowserRouter>
                        <Login />
                    </BrowserRouter>
                </LanguageContext.Provider>
            </AuthContext.Provider>
        );

        const submitButton = screen.getByRole('button', { name: 'Login' });
        fireEvent.click(submitButton);

        await waitFor(() => {
            const errorMessage = screen.getByText('All fields are required');
            expect(errorMessage).toBeInTheDocument();
        });
    });

    test('Submitting the form with all fields filled logs the user in', async () => {
        const mockLogin = jest.fn();

        jest.mock('../../services/authService', () => ({
            login: () => Promise.resolve({ _id: '123', email: 'test@example.com', accessToken: 'abc123' }),
        }));

        render(
            <AuthContext.Provider value={{ userLogin: mockLogin }} >
                <LanguageContext.Provider value={{
                    language: 'english',
                    setAppLanguage: () => { }
                }}>
                    <BrowserRouter>
                        <Login />
                    </BrowserRouter>
                </LanguageContext.Provider>
            </AuthContext.Provider>
        );

        const emailInput = screen.getByLabelText('Email');
        const passwordInput = screen.getByLabelText('Password');
        const submitButton = screen.getByRole('button', { name: 'Login' });

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password' } });
        fireEvent.click(submitButton);

        await waitFor(() => expect(mockLogin).toHaveBeenCalled());
        await waitFor(() => {
            expect(mockLogin).toHaveBeenCalledWith({
                _id: '123',
                email: 'test@example.com',
                accessToken: 'abc123',
            });
        })
    });
})