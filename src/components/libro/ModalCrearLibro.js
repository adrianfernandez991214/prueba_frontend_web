import React, { useEffect, useState } from 'react';
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
import { Libro_post, cloced_modal_crear_libro } from '../../actions/libro';
import { autores_get_todos } from '../../actions/autor';

const theme = createTheme();

Modal.setAppElement('#root');

//Todos los generos definidos que puede ser un libro
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

//Modal que va a permitir insertar un nuevo libro
//Los archivos de los libros solo pueden ser de formato pdf, doc o docx
export const ModalCrearLibro = () => {

    const Dispatch = useDispatch();
    const { modalCrear } = useSelector(state => state.libro);
    //Se piden todos los autores al reducer autor
    const { autores } = useSelector(state => state.autor);

    useEffect(() => {
        Dispatch(autores_get_todos());
    }, [Dispatch]);

    const closeModal = () => {
        Dispatch(cloced_modal_crear_libro());
    }

    const [formLibro, hanledInputLibro, setvalues] = useForm({
        titulo: '',
        genero: generos_literarios[0],
        anno: new Date().getFullYear(),
        autor: ''
    });

    const [archivo, setarchivo] = useState(null);

    const hanledArchivo = (e) => {
        setarchivo(e.target.files[0]);
    }

    const { titulo, genero, anno, autor } = formLibro;

    const FormSubmit = (e) => {
        e.preventDefault();
        const datos = {
            titulo,
            genero,
            anno,
            autor,
            archivo
        }
        
        //Se comprueba que el año esta ente 1800 y el año actual
        if (anno < 1800 || anno > new Date().getFullYear()) {
            Swal.fire("Error", `Solo se aceptarán el año del libro entre 1800 y ${new Date().getFullYear()}`, 'error');
        } else {

            Dispatch(Libro_post(datos));
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
            isOpen={modalCrear}
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
                                        Insertar Libro
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

                                <Grid item xs={12} sx={{ maxWidth: 600 }}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="archivo"
                                        name='archivo'
                                        type='file'
                                        inputProps={{
                                            accept: ".pdf,.doc,.docx"
                                        }}
                                        onChange={hanledArchivo}
                                    />
                                </Grid>


                            </Grid>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                startIcon={<SaveIcon />}
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Insertar libro
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider >

        </Modal >
    </>)
}
