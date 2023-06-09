import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

import { AuthContext } from "../../../contexts/AuthContext";
import { LanguageContext } from "../../../contexts/LanguageContext";
import { languages } from '../../../languages/languages';
import { useValidateForm } from "../../../hooks/useValidateForm";
import Notification from "../../common/notification/Notification";
import Backdrop from '../../common/backdrop/Backdrop';
import ModalError from "../../common/modal/ModalError";

import styles from './Register.module.css';

import { firebaseApp } from "../../../firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
const auth = getAuth(firebaseApp);

const Register = () => {
    const { language } = useContext(LanguageContext);

    const { userLogin } = useContext(AuthContext);

    const navigate = useNavigate();

    const [showNotification, setShowNotification] = useState(true);
    const [showPassNotification, setShowPassNotification] = useState(false);

    const [showModalError, setShowModalError] = useState(false);
    const [errorMessage, setErrorMessage] = useState([]);

    const [values, setValues] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });

    useEffect(() => {
        if (values.email === '' || values.password === '' || values.confirmPassword === '') {
            setShowNotification(true);
        } else {
            setShowNotification(false);
        }
    }, [values.email, values.password, values.confirmPassword])

    useEffect(() => {
        if (values.password !== values.confirmPassword && values.confirmPassword) {
            setShowPassNotification(true);
        } else {
            setShowPassNotification(false);
        }
    }, [values.password, values.confirmPassword])

    const {minLength, isValidEmail, isFormValid, errors} = useValidateForm(values);

    const changeValueHandler = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }))
    };  

    const onClickOk = () => {
        setShowModalError(false);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        createUserWithEmailAndPassword(auth, values.email, values.password.trim())
            .then((userCredential) => {
                const user = userCredential.user;
                const authData = {
                    _id: user.uid,
                    accessToken: user.accessToken,
                    email: user.email
                };
                userLogin(authData);
                navigate('/');
            })
            .catch((error) => {
                setShowModalError(true);
                setErrorMessage(state => [...state, error.message]);
                navigate('/register');
                setValues({
                    email: '',
                    password: '',
                    confirmPassword: ''
                });
            });
    };

    return (
        <section className={styles.register}>
            {showNotification ? <Notification message={languages.allFieldsRequired[language]} /> : null}
            {showPassNotification ? <Notification message={languages.passwordsDontMatch[language]} /> : null}

            {showModalError && <Backdrop onClick={onClickOk} />}
            {showModalError && <ModalError errorMessage={errorMessage} onClickOk={onClickOk} />}

            <div className={styles["register-wrapper"]}>
                <form className={styles["register-form"]} onSubmit={onSubmit}>

                    <h1>{languages.register[language]}</h1>

                    <label htmlFor="register-email">{languages.email[language]}</label>
                    <input
                        type="email"
                        id="register-email"
                        name="email"
                        value={values.email}
                        onChange={changeValueHandler}
                        onBlur={isValidEmail}
                    />

                    {errors.email &&
                        <p className={styles.error}>
                            {languages.emailErrorMessage[language]}
                        </p>
                    }

                    <label htmlFor="register-password">{languages.password[language]}</label>
                    <input
                        type="password"
                        name="password"
                        id="register-password"
                        value={values.password}
                        onChange={changeValueHandler}
                        onBlur={(e) => minLength(e, 6)}
                    />

                    {errors.password &&
                        <p className={styles.error}>
                            {languages.passwordErrorMessage[language]}
                        </p>
                    }

                    <label htmlFor="confirm-register-password">{languages.reEnterPassword[language]}</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        id="confirm-register-password"
                        value={values.confirmPassword}
                        onChange={changeValueHandler}
                    />

                    <div className={styles["btn-register"]}>
                        <button
                            type="submit"
                            disabled={!isFormValid || showNotification || showPassNotification}
                            className={styles[`${!isFormValid || showNotification || showPassNotification ? 'button-disabled' : ''}`]}
                        >
                            {languages.register[language]}
                        </button>
                    </div>

                    <p className={styles["account-message"]}>{languages.alreadyHaveAccount[language]}<Link to="/login">{languages.here[language]}</Link></p>

                </form>
            </div>
        </section>
    );
}

export default Register;
