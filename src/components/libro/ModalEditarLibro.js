import React, { useEffect } from 'react';
import Modal from 'react-modal';
import '../autor/Style_modal.css';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useDispatch } from 'react-redux';
import { Button, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import Swal from 'sweetalert2';
import SaveIcon from '@mui/icons-material/Save';
import { Libro_Put, cloced_modal_editar_libro } from '../../actions/libro';
import { autores_get_todos } from '../../actions/autor';

const theme = createTheme();

Modal.setAppElement('#root');

const generos_literarios = [
    'Novela',
    'Cuento',
    'Poesía',
    'Ensayo',
    'Biografía',
    'Autobiografía',
    'Memorias',
    'Crónica',
    'Fábula',
    'Ciencia ficción',
    'Fantasía',
    'Misterio',
    'Thriller',
    'Drama',
    'Comedia',
    'Romance',
    'Histórico',
    'Policial',
    'Aventura',
    'Terror'
];

export const ModalEditarLibro = () => {

    const Dispatch = useDispatch();
    const { modalEditar, activelibro } = useSelector(state => state.libro);
    const { autores } = useSelector(state => state.autor);

    useEffect(() => {
        Dispatch(autores_get_todos());
    }, [Dispatch]);

    const closeModal = () => {
        Dispatch(cloced_modal_editar_libro());
    }

    const [formLibro, hanledInputLibro, setvalues] = useForm({
        titulo: '',
        genero: generos_literarios[0],
        anno: new Date().getFullYear(),
        autor: ''
    });

    useEffect(() => {
        if (activelibro)
            setvalues({
                _id: activelibro._id,
                titulo: activelibro.titulo,
                genero: activelibro.genero,
                anno: activelibro.anno,
                autor: activelibro.autor._id
            });
    }, [activelibro, setvalues])

    const { titulo, genero, anno, autor } = formLibro;

    const FormSubmit = (e) => {
        e.preventDefault();
        if (anno < 1800 || anno > new Date().getFullYear()) {
            Swal.fire("Error", `Solo se aceptarán el año del libro entre 1800 y ${new Date().getFullYear()}`, 'error');
        } else {
            Dispatch(Libro_Put(formLibro));
            setvalues({
                titulo: '',
                genero: generos_literarios[0],
                anno: new Date().getFullYear(),
                autor: ''
            })
        }


    }

    return (<>
        <Modal
            isOpen={modalEditar}
            onRequestClose={closeModal}
            contentLabel="Example Modal"
            closeTimeoutMS={200}
            className="modal"
            overlayClassName="modal-fondo"

        >

            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Box component="form" onSubmit={FormSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sd={6} sx={{ maxWidth: 600 }} >
                                    <Typography variant="h5" gutterBottom>
                                        Editar Libro
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sd={6} sx={{ maxWidth: 600 }} >
                                    <TextField
                                        required
                                        fullWidth
                                        id="titulo"
                                        label="titulo"
                                        name="titulo"
                                        value={titulo}
                                        onChange={hanledInputLibro}
                                    />
                                </Grid>

                                <Grid item xs={12} sx={{ maxWidth: 600 }}>
                                    <Select
                                        id="genero"
                                        value={genero}
                                        onChange={hanledInputLibro}
                                        fullWidth
                                        name='genero'
                                        label="genero"
                                        required
                                    >
                                        <MenuItem value=''>Seleccione genero</MenuItem>
                                        {
                                            //(autores.length !== 0) ? <MenuItem value={autores[0]._id}>{autores[0].nombre}</MenuItem> : ""
                                            generos_literarios.map((item, index) => (
                                                <MenuItem key={index} value={item}>{item}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </Grid>

                                <Grid item xs={12} sx={{ maxWidth: 600 }}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="anno"
                                        label="año"
                                        value={anno}
                                        name='anno'
                                        type='number'
                                        onChange={hanledInputLibro}
                                    />
                                </Grid>

                                <Grid item xs={12}>

                                    <Select
                                        id="autor"
                                        value={autor}
                                        onChange={hanledInputLibro}
                                        fullWidth
                                        name='autor'
                                        label="autor"
                                        required
                                    >
                                        <MenuItem value=''>Seleccione</MenuItem>
                                        {
                                            //(autores.length !== 0) ? <MenuItem value={autores[0]._id}>{autores[0].nombre}</MenuItem> : ""
                                            autores.map((item, index) => (
                                                <MenuItem key={index} value={item._id}>{item.nombre + " " + item.apellidos}</MenuItem>
                                            ))
                                        }
                                    </Select>

                                </Grid>
                            </Grid>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                startIcon={<SaveIcon />}
                                sx={{ mt: 3, mb: 2 }}
                            >
                                GUARDAR CAMBIOS
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider >

        </Modal >
    </>)
}
