import { useState } from "react";

import { IMAGE_URL_PATTERN } from "../constants";
import { EMAIL_PATTERN } from '../constants';

export const useValidateForm = (values) => {
    const [errors, setErrors] = useState({});

    const minLength = (e, min) => {
        setErrors(state => ({
            ...state,
            [e.target.name]: values[e.target.name].length < min
        }));
    };

    const isPositive = (e) => {
        let number = Number(e.target.value);

        setErrors(state => ({
            ...state,
            [e.target.name]: number < 0 || isNaN(number)
        }));
    };

    const isValidUrl = (e) => {
        setErrors(state => ({
            ...state,
            [e.target.name]: !IMAGE_URL_PATTERN.test(e.target.value)
        }));
    };

    const isValidEmail = (e) => {
        setErrors(state => ({
            ...state,
            [e.target.name]: !EMAIL_PATTERN.test(e.target.value)
        }));
    };

    const isFormValid = !Object.values(errors).some(x => x);

    return {
        minLength,
        isPositive,
        isValidUrl,
        isValidEmail,
        isFormValid,
        errors
    }
};
