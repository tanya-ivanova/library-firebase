import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../../contexts/AuthContext";

import { firebaseApp } from "../../../firebase";
import { getAuth } from "firebase/auth";
const auth = getAuth(firebaseApp);

const Logout = () => {
    const navigate = useNavigate();
    const { user, userLogout } = useContext(AuthContext);

    useEffect(() => {       

        auth.signOut()
            .then(() => {
                userLogout();
                navigate('/');
            })
            .catch((error) => {
                console.log(error.message);
                navigate('/');
            });
    }, [user.accessToken, navigate, userLogout]);

    return null;
};

export default Logout;
