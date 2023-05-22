import React, { useState } from 'react';
import Modal from 'react-modal';
import '../autor/Style_modal.css';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useDispatch } from 'react-redux';
import { Button, TextField, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import SaveIcon from '@mui/icons-material/Save';
import { Libro_Actualizar_Archivo, cloced_modal_actualizar_archivo_libro } from '../../actions/libro';

const theme = createTheme();

Modal.setAppElement('#root');

//Modal que va a permitir actualizar el archivo de un libro determinado
//Los archivos de los libros solo pueden ser de formato pdf, doc o docx
export const ModalActualizarArchivo = () => {

    const Dispatch = useDispatch();
    const { modalActualizarArchivo, activelibro } = useSelector(state => state.libro);

    const closeModal = () => {
        Dispatch(cloced_modal_actualizar_archivo_libro());
    }

    const [archivo, setarchivo] = useState(null);

    const hanledArchivo = (e) => {
        setarchivo(e.target.files[0]);
    }

    const FormSubmit = (e) => {
        e.preventDefault();
        const data = {
            _id: activelibro._id,
            archivo
        }
        Dispatch(Libro_Actualizar_Archivo(data));

    }

    return (<>
        <Modal
            isOpen={modalActualizarArchivo}
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
                                        Actualizar Archivo
                                    </Typography>
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
                                GUARDAR CAMBIOS
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider >

        </Modal >
    </>)
}
