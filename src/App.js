import { Routes, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import ErrorBoundary from './components/common/ErrorBoundary';

import PrivateRoute from './components/common/PrivateRoute';
import Header from './components/header/Header';
import Home from './components/home/Home';
import Footer from './components/footer/Footer';
import Register from './components/register/Register';
import Login from './components/login/Login';
import Logout from './components/logout/Logout';
import AddBook from './components/addBook/AddBook';
import AddBookExcel from './components/addBook/AddBookExcel';
import Catalog from './components/catalog/Catalog';
import CatalogAdmin from './components/catalog/CatalogAdmin';
import Profile from './components/profile/Profile';
import BookDetails from './components/bookDetails/BookDetails';
import EditBook from './components/editBook/EditBook';
import Search from './components/search/Search';
import SearchInGoogle from './components/search/SearchInGoogle';
import NotFound from './components/notFound/NotFound';

import './App.css';

function App() {
    return (

        <AuthProvider>
            <LanguageProvider>
                <div className='site-wrapper'>
                    <Header />

                    <ErrorBoundary>
                        <main>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/register" element={<Register />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/catalog" element={<Catalog />} />
                                <Route path="/catalog/:bookId/details" element={<BookDetails />} />

                                <Route element={<PrivateRoute />}>
                                    <Route path="/catalog-admin" element={<CatalogAdmin />} />
                                    <Route path='/logout' element={<Logout />} />
                                    <Route path="/create" element={<AddBook />} />
                                    <Route path="/create-from-excel" element={<AddBookExcel />} />
                                    <Route path="/:googleBookId/create" element={<AddBook />} />
                                    <Route path="/catalog/:bookId/edit" element={<EditBook />} />
                                    <Route path="/profile" element={<Profile />} />
                                    <Route path="/search" element={<Search />} />
                                    <Route path="/searchInGoogle" element={<SearchInGoogle />} />
                                </Route>

                                <Route path="*" element={<NotFound />} />
                            </Routes>
                        </main>
                    </ErrorBoundary>

                    <Footer />
                </div>
            </LanguageProvider>
        </AuthProvider>

    );
}

export default App;
