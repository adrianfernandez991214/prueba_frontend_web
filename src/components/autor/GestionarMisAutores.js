import React from 'react';
import { useEffect } from 'react';
import { Box, Container } from '@mui/material';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { paginaActual } from '../../actions/auth';
import { Autores_get_los_mios } from '../../actions/autor';
import { BotonEditarAutor, BotonEliminarAutor, BottomComplementos } from './BotonesAutores'
import { ModalCrearAutor } from './ModalCrearAutor';
import { ModalEditarAutor } from './ModalEditarAutor';

const columns = [
    { field: 'id', headerName: '#', flex: 0.05 },
    {
        field: 'nombre',
        headerName: 'Nombre',
        flex: 0.15,
    },
    {
        field: 'apellidos',
        headerName: 'Apellidos',
        flex: 0.15,
        //editable: true, -> esto hace que la tabla se pueda editar
    },
    {
        field: 'correo',
        headerName: 'Correo',
        flex: 0.2,
    },
    {
        field: 'orcid',
        headerName: 'ORCID',
        flex: 0.2,
    },
    {
        field: 'editar',
        headerName: 'Editar',
        type: 'actions',
        flex: 0.1,
        renderCell: params => <BotonEditarAutor {...params} />
    },
    {
        field: 'eliminar',
        headerName: 'Eliminar',
        type: 'actions',
        flex: 0.1,
        renderCell: params => <BotonEliminarAutor {...params} />
    }
];

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarExport />
        </GridToolbarContainer>
    );
}

const GestionarMisAutores = () => {

    const Dispatch = useDispatch();

    useEffect(() => {
        Dispatch(paginaActual("Gestionar mis autores"))
        Dispatch(Autores_get_los_mios());
    }, [Dispatch]);

    const { autores } = useSelector(state => state.autor);
    let cont = 1;

    const rows = autores.map(e => ({
        id: cont++,
        nombre: e.nombre,
        apellidos: e.apellidos,
        correo: e.correo,
        orcid: e.orcid,
        key: e._id
    }));

    return (
        <div>
            <Container component="main">
                <Box
                    sx={{
                        marginTop: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >

                    <Box sx={{ width: '100%' }}>

                        <BottomComplementos />

                        <DataGrid sx={{
                            display: "flex",
                            "& .MuiDataGrid-cellContent":
                            {
                                whiteSpace: "break-spaces",
                                lineHeight: "normal",
                            },
                        }}
                            rows={rows}
                            columns={columns}
                            autoHeight={true}
                            pageSize={10}
                            rowsPerPageOptions={[10]}
                            experimentalFeatures={{ newEditingApi: true }}
                            components={{
                                Toolbar: CustomToolbar,
                            }}
                        />
                    </Box>
                    <ModalCrearAutor />
                    <ModalEditarAutor />
                </Box>
            </Container>
        </div>
    )
}

export default GestionarMisAutores;
