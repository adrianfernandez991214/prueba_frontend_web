import React from 'react'
import { useDispatch } from 'react-redux'
import { Edit, Menu, Delete, BookmarkAdd, LibraryBooks } from '@mui/icons-material';
import Swal from 'sweetalert2';
import { SpeedDial, SpeedDialAction, Button } from '@mui/material';
import { Libro_Delete, open_modal_actualizar_archivo_libro, open_modal_crear_libro, open_modal_editar_libro, seleccionar_libro } from '../../actions/libro'

export const BotonEditarLibro = ({ row }) => {

    const Dispatch = useDispatch()

    const hanledClick = () => {
        Dispatch(seleccionar_libro(row.key));
        Dispatch(open_modal_editar_libro());
    }

    return (
        <div>

            <Button variant="contained" style={{ backgroundColor: "#f4511e" }} onClick={hanledClick}>
                <Edit />
            </Button>

        </div>
    )
}

export const BotonActualizarArchivo = ({ row }) => {

    const Dispatch = useDispatch()

    const hanledClick = () => {
        Dispatch(seleccionar_libro(row.key));
        Dispatch(open_modal_actualizar_archivo_libro());
    }

    return (
        <div>

            <Button variant="contained" style={{ backgroundColor: "#009c8c" }} onClick={hanledClick}>
                <LibraryBooks />
            </Button>

        </div>
    )
}

export const BotonEliminarLibro = ({ row }) => {

    const Dispatch = useDispatch()

    const hanledClick = () => {
        Swal.fire({
            title: '¿Está seguro?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '¡Sí, bórralo!'
        }).then((result) => {
            if (result.isConfirmed) {
                Dispatch(Libro_Delete(row.key));
            }
        })
    }

    return (
        <div>

            <Button variant="contained" style={{ backgroundColor: "#c62828" }} onClick={hanledClick}>
                <Delete />
            </Button>

        </div>
    )
}


export const BottomComplementosLibros = () => {

    const Dispatch = useDispatch()

    const hanledClickCrear = () => {
        Dispatch(open_modal_crear_libro());
    }

    return (
        <div>

            <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{ position: 'fixed', marginRight: '10px', bottom: 16, right: 16 }}
                icon={<Menu />}
            >

                <SpeedDialAction
                    key={1}
                    icon={<BookmarkAdd />}
                    tooltipTitle={'Insertar libro'}
                    onClick={hanledClickCrear}
                />
            </SpeedDial>

        </div>
    )
}
