import { render, screen, cleanup } from "@testing-library/react";
import { LanguageContext } from "../../contexts/LanguageContext";
import Home from "./Home";

describe('Home component image', () => {
    afterEach(cleanup);

    test('renders the image', () => {
        render(
            <LanguageContext.Provider value={{
                language: 'english',          
                setAppLanguage: () => {}          
            }}>
                <Home />
            </LanguageContext.Provider>);

        const imageElement = screen.getByRole('img');
        expect(imageElement).toBeInTheDocument();
        expect(imageElement).toHaveAttribute('src');
    });
});

describe('Home component EN', () => {
    afterEach(cleanup);

    test('renders "Why Reading Books?" in English', () => {
        render(
            <LanguageContext.Provider value={{
                language: 'english',          
                setAppLanguage: () => {}          
            }}>
                <Home />
            </LanguageContext.Provider>);        
        
        const whyReadingBooksElement = screen.getByText('Why Reading Books?', { exact: true });
        expect(whyReadingBooksElement).toBeInTheDocument();
    });

    test('renders "Reading strengthens your brain" in English', () => {
        render(
            <LanguageContext.Provider value={{
                language: 'english',          
                setAppLanguage: () => {}          
            }}>
                <Home />
            </LanguageContext.Provider>);        
        
        const readingStrengthsElement = screen.getByText('Reading strengthens your brain', { exact: true });
        expect(readingStrengthsElement).toBeInTheDocument();
    });

    test('renders "Increases your ability to empathize" in English', () => {
        render(
            <LanguageContext.Provider value={{
                language: 'english',          
                setAppLanguage: () => {}          
            }}>
                <Home />
            </LanguageContext.Provider>);        
        
        const increasesEmpathizeElement = screen.getByText('Increases your ability to empathize', { exact: true });
        expect(increasesEmpathizeElement).toBeInTheDocument();
    });

    test('renders "Builds your vocabulary" in English', () => {
        render(
            <LanguageContext.Provider value={{
                language: 'english',          
                setAppLanguage: () => {}          
            }}>
                <Home />
            </LanguageContext.Provider>);        
        
        const buildVocabularyElement = screen.getByText('Builds your vocabulary', { exact: true });
        expect(buildVocabularyElement).toBeInTheDocument();
    });

    test('renders "Helps prevent age-related cognitive decline" in English', () => {
        render(
            <LanguageContext.Provider value={{
                language: 'english',          
                setAppLanguage: () => {}          
            }}>
                <Home />
            </LanguageContext.Provider>);        
        
        const preventCognitiveDeclineElement = screen.getByText('Helps prevent age-related cognitive decline', { exact: true });
        expect(preventCognitiveDeclineElement).toBeInTheDocument();
    });

    test('renders "Reduces stress', () => {
        render(
            <LanguageContext.Provider value={{
                language: 'english',          
                setAppLanguage: () => {}          
            }}>
                <Home />
            </LanguageContext.Provider>);        
        
        const reducesStressElement = screen.getByText('Reduces stress', { exact: true });
        expect(reducesStressElement).toBeInTheDocument();
    });
});

describe('Home component BG', () => {
    afterEach(cleanup);

    test('renders "Защо да четем книги" in English', () => {
        render(
            <LanguageContext.Provider value={{
                language: 'bulgarian',          
                setAppLanguage: () => {}          
            }}>
                <Home />
            </LanguageContext.Provider>);        
        
        const whyReadingBooksElement = screen.getByText('Защо да четем книги?', { exact: true });
        expect(whyReadingBooksElement).toBeInTheDocument();
    });

    test('renders "Четенето укрепва мозъка ви" in English', () => {
        render(
            <LanguageContext.Provider value={{
                language: 'bulgarian',          
                setAppLanguage: () => {}          
            }}>
                <Home />
            </LanguageContext.Provider>);        
        
        const readingStrengthsElement = screen.getByText('Четенето укрепва мозъка ви', { exact: true });
        expect(readingStrengthsElement).toBeInTheDocument();
    });

    test('renders "Увеличава способността ви за съчувствие" in English', () => {
        render(
            <LanguageContext.Provider value={{
                language: 'bulgarian',          
                setAppLanguage: () => {}          
            }}>
                <Home />
            </LanguageContext.Provider>);        
        
        const increasesEmpathizeElement = screen.getByText('Увеличава способността ви за съчувствие', { exact: true });
        expect(increasesEmpathizeElement).toBeInTheDocument();
    });

    test('renders "Изгражда вашия речник" in English', () => {
        render(
            <LanguageContext.Provider value={{
                language: 'bulgarian',          
                setAppLanguage: () => {}          
            }}>
                <Home />
            </LanguageContext.Provider>);        
        
        const buildVocabularyElement = screen.getByText('Изгражда вашия речник', { exact: true });
        expect(buildVocabularyElement).toBeInTheDocument();
    });

    test('renders "Помага за предотвратяване на свързания с възрастта когнитивен спад" in English', () => {
        render(
            <LanguageContext.Provider value={{
                language: 'bulgarian',          
                setAppLanguage: () => {}          
            }}>
                <Home />
            </LanguageContext.Provider>);        
        
        const preventCognitiveDeclineElement = screen.getByText('Помага за предотвратяване на свързания с възрастта когнитивен спад', { exact: true });
        expect(preventCognitiveDeclineElement).toBeInTheDocument();
    });

    test('renders "Намалява стреса', () => {
        render(
            <LanguageContext.Provider value={{
                language: 'bulgarian',          
                setAppLanguage: () => {}          
            }}>
                <Home />
            </LanguageContext.Provider>);        
        
        const reducesStressElement = screen.getByText('Намалява стреса', { exact: true });
        expect(reducesStressElement).toBeInTheDocument();
    });
});

describe('Home component', () => {
  test('reloads the page when the there is an error', () => {
    const error = 'errorMessage';    
    const reloadMock = jest.fn();
    Object.defineProperty(window, 'location', {
      value: {
        reload: reloadMock,
      },
    });
    
    render(
        <LanguageContext.Provider value={{
            language: 'bulgarian',          
            setAppLanguage: () => {}          
        }}>
            <Home error={error} />
        </LanguageContext.Provider>
    );  

    expect(reloadMock).toHaveBeenCalled();
  });
});