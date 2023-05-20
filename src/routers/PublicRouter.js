import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const PublicRouter = ({ children }) => {

    const { uid } = useSelector(state => state.auth);

    return !!uid
        ?<Navigate to='/' />
        : children
}