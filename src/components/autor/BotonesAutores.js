import React from 'react'
import { useDispatch } from 'react-redux'
import { Edit, Menu, Delete, PersonAddAlt1 } from '@mui/icons-material';
import Swal from 'sweetalert2';
import { SpeedDial, SpeedDialAction, Button } from '@mui/material';
import { Autor_Delete, open_modal_crear_autor, open_modal_editar_autor, seleccionar_autor } from '../../actions/autor';

export const BotonEditarAutor = ({ row }) => {

    const Dispatch = useDispatch()

    const hanledClick = () => {
        Dispatch(seleccionar_autor(row.key));
        Dispatch(open_modal_editar_autor());
    }

    return (
        <div>

            <Button variant="contained" style={{ backgroundColor: "#f4511e" }} onClick={hanledClick}>
                <Edit />
            </Button>

        </div>
    )
}

export const BotonEliminarAutor = ({ row }) => {

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
                Dispatch(Autor_Delete(row.key));
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


export const BottomComplementos = () => {

    const Dispatch = useDispatch()

    const hanledClickCrear = () => {
       Dispatch(open_modal_crear_autor());
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
                    icon={<PersonAddAlt1 />}
                    tooltipTitle={'Insertar autor'}
                    onClick={hanledClickCrear}
                />
            </SpeedDial>

        </div>
    )
}
