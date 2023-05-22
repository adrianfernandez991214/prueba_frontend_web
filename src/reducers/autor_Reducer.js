import { types } from "../types/types";

//Estado incial de del reducer que va a contar, con una lista de autores que
//va a ir cambiando segun las necesidades de la aplicación, el autor activo(seleccionado)
//y el estado de los modal crear autor y editar autor 
const initialState = {
    autores: [],
    activeAutor: null,
    modalCrear: false,
    modalEditar: false,
}

//reducer encargado de las acciones refentes a los autores
export const autor_Reducer = (state = initialState, action) => {

    switch (action.type) {
        case types.autorGetLosMios:
            return {
                ...state,
                autores: [...action.payloand]
            }
        case types.autorGetTodos:
            return {
                ...state,
                autores: [...action.payloand]
            }
        case types.autorSelect:
            return {
                ...state,
                activeAutor: state.autores.find(
                    e => (e._id === action.payloand)
                )
            }
        case types.autorPost:
            return {
                ...state,
                autores: [...state.autores, action.payloand]
            }
        case types.autorModalCrearOpen:
            return {
                ...state,
                modalCrear: true
            }
        case types.autorModalCrearCloced:
            return {
                ...state,
                modalCrear: false
            }
        case types.autorModalEditarOpen:
            return {
                ...state,
                modalEditar: true
            }
        case types.autorModalEditarCloced:
            return {
                ...state,
                modalEditar: false
            }
        case types.autorPut:
            return {
                ...state,
                autores: state.autores.map(
                    e => (e._id === action.payloand._id) ? action.payloand : e
                )
            }
        case types.autorDelete:
            return {
                ...state,
                autores: state.autores.filter(
                    e => (e._id !== action.payloand)
                )
            }
        default:
            return state;
    }

}