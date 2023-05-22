import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const PublicRouter = ({ children }) => {

    const { uid } = useSelector(state => state.auth);

    //Se compueba si usuario es logueado, si lo esta pasa a las rutas
    //privado, sino es devuelto a las publicas 
    return !!uid
        ? <Navigate to='/' />
        : children
}