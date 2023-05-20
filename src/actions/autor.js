import { fetchConToken } from "../helpers/fetch"
import { types } from "../types/types";
import Swal from "sweetalert2";

export const Autor_post = (datos) => {

    return async (dispatch) => {
        const resp = await fetchConToken('autor', { ...datos }, 'POST');
        const body = await resp.json();

        if (body.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Se ha guardado correctamente el autor',
                showConfirmButton: false,
                timer: 2500
            });
            dispatch(post_crear_autor(body.autor))
            dispatch(cloced_modal_crear_autor());
        } else {
            Swal.fire("Error", body.msg, 'error')
        }
    }
}

const post_crear_autor = (datos) => ({
    type: types.autorPost,
    payloand: datos
});

export const Autores_get_los_mios = () => {
    return async (dispatch) => {
        const resp = await fetchConToken('autor/los_mios');
        const body = await resp.json();

        if (body.ok) {
            dispatch(get_los_mios(body.autores));
        } else {
            Swal.fire("Error", body.msg, 'error');
        }

    }
}

const get_los_mios = (autores) => ({
    type: types.autorGetLosMios,
    payloand: autores
});

export const Autores_Put = (datos) => {

    return async (dispatch) => {

        try {
            const resp = await fetchConToken(`autor/${datos._id}`, { ...datos }, 'PUT');
            const body = await resp.json();

            if (body.ok) {
                dispatch(put_editar_autor(body.autor));
                dispatch(cloced_modal_editar_autor(body.autor._id));
                dispatch(seleccionar_autor(body.autor._id));
                Swal.fire({
                    icon: 'success',
                    title: 'Se ha modificado correctamente el autor',
                    showConfirmButton: false,
                    timer: 2500
                });
            } else {
                Swal.fire("Error", body.msg, 'error')
            }
        } catch (error) {
            console.error(error);
        }

    }
}

export const seleccionar_autor = (id) => ({
    type: types.autorSelect,
    payloand: id
});

export const open_modal_crear_autor = () => ({
    type: types.autorModalCrearOpen
});

export const cloced_modal_crear_autor = () => ({
    type: types.autorModalCrearCloced
});

const put_editar_autor = (datos) => ({
    type: types.autorPut,
    payloand: datos
});

export const open_modal_editar_autor = () => ({
    type: types.autorModalEditarOpen
});

export const cloced_modal_editar_autor = () => ({
    type: types.autorModalEditarCloced
});

export const Autor_Delete = (id) => {

    return async (dispatch) => {

        try {

            const resp = await fetchConToken(`autor/${id}`, {}, 'DELETE');
            const body = await resp.json();

            if (body.ok) {
                dispatch(delete_eliminar_autor(id));
                Swal.fire({
                    icon: 'success',
                    title: 'Se ha eliminado correctamente el ensayo',
                    showConfirmButton: false,
                    timer: 2500
                });
            } else {
                Swal.fire('Error', body.msg, 'error');
            }

        } catch (error) {
            console.error(error);
        }

    }

}

const delete_eliminar_autor = (id) => ({
    type: types.autorDelete,
    payloand: id
});
