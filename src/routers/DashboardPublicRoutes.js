import Login from '../components/auth/Login';
import Registro from '../components/auth/Registro';
import { Routes, Route } from "react-router-dom";

import * as React from 'react';

//Componente donde se encuentras las rutas publicas
export const DashboardPublicRoutes = () => {

    return <>

        <Routes>

            <Route exact path='/login' element={<Login />} />
            <Route exact path='/registro' element={<Registro />} />

            <Route path='/*' element={<Login />} />

        </Routes>

    </>
}