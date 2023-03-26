import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import styles from './Login.module.css';

import { AuthContext } from "../../contexts/AuthContext";
import { LanguageContext } from "../../contexts/LanguageContext";
import {languages} from '../../languages/languages';

import Notification from "../common/notification/Notification";

import { firebaseApp } from "../../firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const auth = getAuth(firebaseApp);

const Login = () => {
    const {language} = useContext(LanguageContext);

    const { userLogin } = useContext(AuthContext);

    const navigate = useNavigate();

    const [showNotification, setShowNotification] = useState(true);

    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    useEffect(() => {
        if (values.email === '' || values.password === '') {
            setShowNotification(true);
        } else {
            setShowNotification(false);
        }
    }, [values.email, values.password])

    const changeValueHandler = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }))
    };

    const onSubmit = (e) => {
        e.preventDefault();     
     
        signInWithEmailAndPassword(auth, values.email, values.password.trim())
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
                alert(error.message);
                navigate('/login');
                setValues({
                    email: '',
                    password: ''
                });
            });
    };

    return (
        <section className={styles.login}>
            {showNotification ? <Notification message={languages.allFieldsRequired[language]} /> : null}

            <div className={styles["login-wrapper"]}>
                <form className={styles["login-form"]} onSubmit={onSubmit}>

                    <h1>{languages.login[language]}</h1>

                    <label htmlFor="login-email">{languages.email[language]}</label>
                    <input
                        type="email"
                        id="login-email"
                        name="email"
                        value={values.email}
                        onChange={changeValueHandler}
                    />

                    <label htmlFor="login-password">{languages.password[language]}</label>
                    <input
                        type="password"
                        name="password"
                        id="login-password"
                        value={values.password}
                        onChange={changeValueHandler}
                    />

                    <div className={styles["btn-login"]}>
                        <button
                            type="submit"
                            disabled={showNotification}
                            className={styles[`${showNotification ? 'button-disabled' : ''}`]}
                        >
                            {languages.login[language]}
                        </button>
                    </div>
                    <p className={styles["account-message"]}>{languages.dontHaveAccount[language]}<Link to="/register">{languages.here[language]}</Link></p>

                </form>
            </div>
        </section>
    );
}

export default Login;
