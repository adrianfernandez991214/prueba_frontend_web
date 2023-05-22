import { useState } from 'react'

//hooks utilizado para facilitar el trabajo con los 
//formularios
export const useForm = (initialState = {}) => {

    const [values, setvalues] = useState(initialState);

    const reset = () => {
        setvalues(initialState);
    }

    const hanledInputChange = ({ target }) => {

        setvalues({
            ...values,
            [target.name]: target.value
        });

    };

    return [
        values,
        hanledInputChange,
        setvalues,
        reset
    ];

};
