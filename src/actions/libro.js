import { fetchConToken } from "../helpers/fetch"
import { types } from "../types/types";
import Swal from "sweetalert2";

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

const get_los_mios = (libros) => ({
    type: types.libroGetLosMios,
    payloand: libros
});