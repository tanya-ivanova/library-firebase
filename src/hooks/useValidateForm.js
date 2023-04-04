import { useState } from "react";
import { IMAGE_URL_PATTERN } from "../constants";

export const useValidateForm = (values) => {
    const [errors, setErrors] = useState({});

    const minLength = (e, bound) => {
        setErrors(state => ({
            ...state,
            [e.target.name]: values[e.target.name].length < bound
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

    const isFormValid = !Object.values(errors).some(x => x);

    return {
        minLength,
        isPositive,
        isValidUrl,
        isFormValid,
        errors
    }
};
