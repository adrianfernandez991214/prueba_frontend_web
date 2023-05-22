import React from 'react';
import { useEffect } from 'react';
import { Box, Container } from '@mui/material';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { paginaActual } from '../../actions/auth';
import { Libos_get_los_mios } from '../../actions/libro';
import { BotonActualizarArchivo, BotonEditarLibro, BotonEliminarLibro, BottomComplementosLibros } from './BotonesLibros';
import { ModalCrearLibro } from './ModalCrearLibro';
import { ModalEditarLibro } from './ModalEditarLibro';
import { ModalActualizarArchivo } from './ModalActualizarArchivo';

//Se crea la estructura de las columnas que va a tener la trabla
const columns = [
    { field: 'id', headerName: '#', flex: 0.05 },
    {
        field: 'titulo',
        headerName: 'Titulo',
        flex: 0.2,
    },
    {
        field: 'genero',
        headerName: 'Genero',
        flex: 0.15,
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
    },
    {
        field: 'actualizar',
        headerName: 'Actualizar Archivo',
        type: 'actions',
        flex: 0.1,
        renderCell: params => <BotonActualizarArchivo {...params} />
    },
    {
        field: 'editar',
        headerName: 'Editar',
        type: 'actions',
        flex: 0.1,
        renderCell: params => <BotonEditarLibro {...params} />
    },
    {
        field: 'eliminar',
        headerName: 'Eliminar',
        type: 'actions',
        flex: 0.1,
        renderCell: params => <BotonEliminarLibro {...params} />
    }
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

    //utlizando useSelector se piden de los reducer los autores
    const { libros } = useSelector(state => state.libro);
    let cont = 1;
    
    //Se estructuran los libros para ser utilizados en la tabla 
    const rows = libros.map(e => ({
        id: cont++,
        titulo: e.titulo,
        genero: e.genero,
        anno: e.anno,
        autor: e.autor ? (e.autor.nombre + " " + e.autor.apellidos) : 'Autor desconocido',
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
                        <BottomComplementosLibros />
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
                            rowsPerPageOptions={[25, 50, 100]}
                            experimentalFeatures={{ newEditingApi: true }}
                            components={{
                                Toolbar: CustomToolbar,
                            }}
                        />
                    </Box>
                    <ModalCrearLibro />
                    <ModalActualizarArchivo />
                    <ModalEditarLibro />
                </Box>
            </Container>
        </div>
    )
}

export default GestionarMisLibros;
