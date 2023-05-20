import { fetchConToken, fetchSinToken } from "../helpers/fetch"
import { types } from "../types/types";
import Swal from "sweetalert2";

export const startLogin = (correo, password) => {

    return async (dispatch) => {
        const resp = await fetchSinToken('login', { correo, password }, 'POST');
        const body = await resp.json();

        if (body.ok) {

            const { _id, nombre, rol } = body.usuario;
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({
                uid: _id,
                nombre,
                rol
            }))
        } else {
            Swal.fire("Error", body.msg, 'error')
        }
    }
}

/*export const startRegister = (name, email, password) => {
    return async (dispatch) => {
        const resp = await fetchSinToken('auth/new', { name, email, password }, 'POST');
        const body = await resp.json();

        if (body.ok) {
            const { _id, name } = body.usuario;
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({
                uid: _id,
                name
            }))
        } else {
            Swal.fire("Error", body.msg, 'error');
        }
    }
}
*/

export const startChecking = () => {
    return async (dispatch) => {
        const resp = await fetchConToken('login/renew');
        const body = await resp.json();

        if (body.ok) {
            const { _id, nombre, rol } = body.usuario;
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({
                uid: _id,
                nombre,
                rol
            }))
        } else {
            dispatch(checkingFinish());
        }
    }
}

export const Usuario_Post = (usuario, navigate) => {
    return async (dispatch) => {
        const resp = await fetchConToken('usuario', { ...usuario }, 'POST');
        const body = await resp.json();

        if (body.ok) {

            Swal.fire({
                icon: 'success',
                title: 'Se ha registrado correctamente el usuario',
                showConfirmButton: false,
                timer: 2500
            });

            navigate('/Home');

        } else if (body.errors) {
            Swal.fire("Error", body.errors[0].msg, 'error');
        }
        else {
            Swal.fire("Error", body.msg, 'error')
        }
    }
}

export const Usuarios_get_todos = () => {
    return async (dispatch) => {
        const resp = await fetchConToken('usuario?limite=0&desde=0');
        const body = await resp.json();
        if (body.ok) {
            dispatch(get_todos_Usuarios(body.usuarios));
        } else {
            Swal.fire("Error", body.msg, 'error');
        }

    }
}

export const startLogout = () => {

    return (dispatch) => {

        localStorage.clear();
        dispatch(logout());

    }
}


export const User_Delete = (id) => {

    return async (dispatch) => {

        try {

            const resp = await fetchConToken(`usuario/${id}`, {}, 'DELETE');
            const body = await resp.json();

            if (body.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Se ha eliminado correctamente el ensayo',
                    showConfirmButton: false,
                    timer: 2500
                });
                dispatch(EliminarUser(id));
            } else {
                Swal.fire('Error', body.msg, 'error');
            }

        } catch (error) {
            console.error(error);
        }

    }

}

export const Usuario_PUT = (datos) => {

    return async (dispatch) => {

        try {
            const resp = await fetchConToken(`usuario/${datos._id}`, { ...datos }, 'PUT');
            const body = await resp.json();

            if (body.ok) {
                dispatch(EditarUser(body.usuario));
                dispatch(ClocedModalEditarUser());
                Swal.fire({
                    icon: 'success',
                    title: 'Se ha modificado correctamente el usuario',
                    showConfirmButton: false,
                    timer: 2500
                });
            } else if (body.errors) {
                Swal.fire("Error", body.errors[0].msg, 'error');
            } else {
                console.log();
                Swal.fire("Error", body.msg, 'error')
            }
        } catch (error) {
            console.error(error);
        }
    }
}

const login = (user) => ({
    type: types.authLogin,
    payloand: user
});

const checkingFinish = () => ({ type: types.authCheckingFinish });

const logout = () => ({ type: types.authLogout });

const get_todos_Usuarios = (Usuarios) => ({
    type: types.User_Get,
    payloand: Usuarios
});

const EliminarUser = (id) => ({
    type: types.User_Delete,
    payloand: id
});

export const openModalEditarUser = () => ({
    type: types.User_ModalEditarOpen
});

export const ClocedModalEditarUser = () => ({
    type: types.User_ModalEditarCloced
});

export const seleccionarUser = (id) => ({
    type: types.User_select,
    payloand: id
});

const EditarUser = (datos) => ({
    type: types.User_PUT,
    payloand: datos
});

export const paginaActual = (pagina) => ({
    type: types.authpaginaActula,
    payloand: pagina
});