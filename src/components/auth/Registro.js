/* eslint eqeqeq: 0 */
import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Fondo from '../../assets/fondo.jpeg'
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { startRegister } from '../../actions/auth';
import { NavLink, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const theme = createTheme();

//componete del registro
export default function Registro() {

    const Dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [formRegistro, hanledInputRegistro, setvalues] = useForm({
        nombre: '',
        apellidos: '',
        correo: '',
        password: '',
        password2: '',
        rol: 'USER_ROLE',
    });

    const { nombre, apellidos, correo, password, password2 } = formRegistro;

    const hanledRegistro = (e) => {
        e.preventDefault();
        if (password != password2) {
            Swal.fire("Error", `Las contraseñas no son iguales`, 'error');
        } else {
            Dispatch(startRegister(formRegistro));
            setvalues({
                nombre: '',
                apellidos: '',
                correo: '',
                password: '',
                password2: '',
                rol: 'USER_ROLE',
            })
            navigate('login');
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: `url(${Fondo})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            Registrate
                        </Typography>
                        <Box component="form" onSubmit={hanledRegistro} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="nombre"
                                label="Nombre"
                                name="nombre"
                                value={nombre}
                                onChange={hanledInputRegistro}
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="apellidos"
                                label="Apellidos"
                                name="apellidos"
                                value={apellidos}
                                onChange={hanledInputRegistro}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="correo"
                                label="Correo"
                                name="correo"
                                value={correo}
                                onChange={hanledInputRegistro}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Contraseña"
                                type="password"
                                id="password"
                                value={password}
                                onChange={hanledInputRegistro}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password2"
                                label="Repite la contraseña"
                                type="password"
                                id="password2"
                                value={password2}
                                onChange={hanledInputRegistro}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Registrarse
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <NavLink to='login'>
                                        {"Iniciar sección"}
                                    </NavLink>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}