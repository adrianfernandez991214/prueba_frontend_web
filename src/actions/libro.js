import { fetchConToken, fetchConTokenArchivo, fetchSinToken } from "../helpers/fetch"
import { types } from "../types/types";
import Swal from "sweetalert2";
const baseURl = process.env.React_APP_API_URL;

//acción de perdir todos los libros relacionados con el usuario
export const Libos_get_los_mios = () => {
    return async (dispatch) => {
        const resp = await fetchConToken('libro/los_mios');
        const body = await resp.json();

        if (body.ok) {
            dispatch(get_los_mios(body.libros));
        } else {
            Swal.fire("Error", body.msg, 'error');
        }

    }
}

//acción de perdir todos los libros
export const Libos_get_todos = () => {
    return async (dispatch) => {
        const resp = await fetchSinToken('libro');
        const body = await resp.json();

        if (body.ok) {
            dispatch(get_todos(body.libros));
        } else {
            Swal.fire("Error", body.msg, 'error');
        }

    }
}


const get_todos = (libros) => ({
    type: types.libroGetTodos,
    payloand: libros
});

const get_los_mios = (libros) => ({
    type: types.libroGetLosMios,
    payloand: libros
});

//acción de crear un nuevo libro
export const Libro_post = (datos) => {

    return async (dispatch) => {
        const resp = await fetchConTokenArchivo('libro', { ...datos }, 'POST');
        const body = await resp.json();

        if (body.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Se ha guardado correctamente el libro',
                showConfirmButton: false,
                timer: 2500
            });
            dispatch(post_crear_libro(body.libro))
            dispatch(cloced_modal_crear_libro());
        } else {
            Swal.fire("Error", body.msg, 'error')
        }
    }
}

const post_crear_libro = (datos) => ({
    type: types.libroPost,
    payloand: datos
});

export const open_modal_crear_libro = () => ({
    type: types.libroModalCrearOpen
});

export const cloced_modal_crear_libro = () => ({
    type: types.libroModalCrearCloced
});

//acción de eliminar un libro relacionado con el usuario
export const Libro_Delete = (id) => {

    return async (dispatch) => {

        try {
            const resp = await fetchConToken(`libro/${id}`, {}, 'DELETE');
            const body = await resp.json();

            if (body.ok) {
                dispatch(delete_eliminar_libro(id));
                Swal.fire({
                    icon: 'success',
                    title: 'Se ha eliminado correctamente el libro',
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

const delete_eliminar_libro = (id) => ({
    type: types.libroDelete,
    payloand: id
});

//acción de modificar un libro relacionado con el usuario 
export const Libro_Put = (datos) => {

    return async (dispatch) => {

        try {
            const resp = await fetchConToken(`libro/${datos._id}`, { ...datos }, 'PUT');
            const body = await resp.json();

            if (body.ok) {
                dispatch(put_editar_libro(body.libro));
                dispatch(cloced_modal_editar_libro(body.libro._id));
                dispatch(seleccionar_libro(body.libro._id));
                Swal.fire({
                    icon: 'success',
                    title: 'Se ha modificado correctamente el libro',
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

export const seleccionar_libro = (id) => ({
    type: types.libroSelect,
    payloand: id
});

const put_editar_libro = (datos) => ({
    type: types.libroPut,
    payloand: datos
});

export const open_modal_editar_libro = () => ({
    type: types.libroModalEditarOpen
});

export const cloced_modal_editar_libro = () => ({
    type: types.libroModalEditarCloced
});

export const open_modal_actualizar_archivo_libro = () => ({
    type: types.libroModalActualizarArchivoOpen
});

export const cloced_modal_actualizar_archivo_libro = () => ({
    type: types.libroModalActualizarArchivoCloced
});

//acción de actulizar el archivo de un libro relacionado con la usuario
export const Libro_Actualizar_Archivo = (datos) => {

    return async (dispatch) => {

        try {


            const token = localStorage.getItem('token') || '';

            const formData = new FormData();
            formData.append('archivo', datos.archivo);

            const resp = await fetch(`${baseURl}/archivo/${datos._id}`, {
                method: 'PUT',
                headers: {
                    'x-token': token
                },
                body: formData
            });

            const body = await resp.json();

            if (body.ok) {
                dispatch(cloced_modal_actualizar_archivo_libro());
                Swal.fire({
                    icon: 'success',
                    title: 'Se ha a actualizar correctamente el archivo libro',
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

//acción de descargar el archivo de un libro
export const Descargar_archivo_libro = (datos) => {
    return async (dispatch) => {
        //const resp = await fetchSinToken(`archivo/${datos._id}`);
        fetch(`${baseURl}/archivo/${datos._id}`)
            .then(response => response.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = datos.archivo;
                document.body.appendChild(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(url);
            });
    }
}