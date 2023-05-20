/* eslint eqeqeq: 0 */
import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PublicRouter } from './PublicRouter';
import { PrivateRoute } from './PrivateRouters';
import { DashboardPrivateRoutes } from './DashboardPrivateRoutes';
import { DashboardPublicRoutes } from './DashboardPublicRoutes';

import { Backdrop, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { startChecking } from '../actions/auth';

export const AppRouter = () => {

    const dispatch = useDispatch();
    const { checking } = useSelector(state => state.auth);
    
    useEffect(() => {
        dispatch(startChecking());
    }, [dispatch]);
    
    if (checking) {
        return (
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={true}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        )
    }

    return <BrowserRouter>

        <Routes>
            <Route path='/auth/*' element={
                <PublicRouter>
                    <DashboardPublicRoutes />
                </PublicRouter>
            } />

            <Route path='/*' element={
                <PrivateRoute>
                    <DashboardPrivateRoutes />
                </PrivateRoute>
            } />
        </Routes>

    </BrowserRouter>
}