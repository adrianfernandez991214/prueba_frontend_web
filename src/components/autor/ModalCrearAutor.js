import React from 'react';
import Modal from 'react-modal';
import './Style_modal.css';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useDispatch } from 'react-redux';
import { Button, TextField, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import SaveIcon from '@mui/icons-material/Save';
import { Autor_post, cloced_modal_crear_autor } from '../../actions/autor';

const theme = createTheme();

Modal.setAppElement('#root');

//Moda que va a permitir insertar un nuevo autor
export const ModalCrearAutor = () => {

    const Dispatch = useDispatch();
    const { modalCrear } = useSelector(state => state.autor);

    const closeModal = () => {
        Dispatch(cloced_modal_crear_autor());
    }

    const [formAutor, hanledInputAutor, setvalues] = useForm({
        nombre: '',
        apellidos: '',
        correo: '',
        orcid: ''
    });

    const { nombre, apellidos, correo, orcid } = formAutor;

    const FormSubmit = (e) => {
        e.preventDefault();
        Dispatch(Autor_post(formAutor));
        setvalues({
            nombre: '',
            apellidos: '',
            correo: '',
            orcid: ''
        });
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
                                        Insertar Autor
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sd={6} sx={{ maxWidth: 600 }} >
                                    <TextField
                                        required
                                        fullWidth
                                        id="nombre"
                                        label="nombre"
                                        name="nombre"
                                        value={nombre}
                                        onChange={hanledInputAutor}
                                    />
                                </Grid>

                                <Grid item xs={12} sx={{ maxWidth: 600 }}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="apellidos"
                                        label="apellidos"
                                        value={apellidos}
                                        name='apellidos'
                                        onChange={hanledInputAutor}
                                    />
                                </Grid>

                                <Grid item xs={12} sx={{ maxWidth: 600 }}>
                                    <TextField
                                        required
                                        fullWidth
                                        type="email"
                                        id="correo"
                                        label="correo"
                                        value={correo}
                                        name='correo'
                                        onChange={hanledInputAutor}
                                    />
                                </Grid>

                                <Grid item xs={12} sx={{ maxWidth: 600 }}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="orcid"
                                        label="orcid"
                                        value={orcid}
                                        name='orcid'
                                        onChange={hanledInputAutor}
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
                                Insertar autor
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider >

        </Modal >
    </>)
}
