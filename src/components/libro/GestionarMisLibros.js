import React from 'react';
import { useEffect } from 'react';
import { Box, Container } from '@mui/material';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { paginaActual } from '../../actions/auth';
import { Libos_get_los_mios } from '../../actions/libro';

const columns = [
    { field: 'id', headerName: '#', flex: 0.05 },
    {
        field: 'titulo',
        headerName: 'Titulo',
        flex: 0.15,
    },
    {
        field: 'genero',
        headerName: 'Genero',
        flex: 0.1,
        //editable: true, -> esto hace que la tabla se pueda editar
    },
    {
        field: 'anno',
        headerName: 'Año',
        flex: 0.1,
    },
    {
        field: 'autor',
        headerName: 'Autor',
        flex: 0.2,
    },/*
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
    }*/
];

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarExport />
        </GridToolbarContainer>
    );
}

const GestionarMisLibros = () => {

    const Dispatch = useDispatch();

    useEffect(() => {
        Dispatch(paginaActual("Gestionar mis libros"))
        Dispatch(Libos_get_los_mios());
    }, [Dispatch]);

    const { libros } = useSelector(state => state.libro);
    let cont = 1;

    const rows = libros.map(e => ({
        id: cont++,
        titulo: e.titulo,
        genero: e.genero,
        anno: e.anno,
        autor: e.autor.nombre + " " + e.autor.apellidos,
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

                </Box>
            </Container>
        </div>
    )
}

export default GestionarMisLibros;
