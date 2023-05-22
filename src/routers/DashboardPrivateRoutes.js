/* eslint eqeqeq: 0 */
import * as React from 'react';
import Home from '../components/home/Home';
import GestionarMisLibros from '../components/libro/GestionarMisLibros';
import GestionarMisAutores from '../components/autor/GestionarMisAutores';

import { Routes, Route } from "react-router-dom";

import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { MainListItems } from '../components/menu/listItems';
import { useDispatch } from 'react-redux';
import { startLogout } from '../actions/auth';
import { useSelector } from 'react-redux';
import { Button, Menu, MenuItem } from '@mui/material';

const drawerWidth = 250;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        [theme.breakpoints.up('md')]: {
            width: `calc(100% - 250px)`,
            marginLeft: 250
        },
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));



const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                }
            }),
        },
    }),
);

const mdTheme = createTheme();

export const DashboardPrivateRoutes = () => {

    const dispatch = useDispatch();
    const { nombre, paginaActual } = useSelector(state => state.auth);
    const [open, setOpen] = React.useState(true);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const openlogin = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const toggleDrawer = () => {
        setOpen(!open);
    };

    const hanledlogout = () => {
        dispatch(startLogout());
    }

    return <>
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="absolute" open={open}>
                    <Toolbar
                        sx={{
                            pr: '24px', // keep right padding when drawer closed
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            {paginaActual}
                        </Typography>

                        <Button
                            id="basic-button"
                            aria-controls={openlogin ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={openlogin ? 'true' : undefined}
                            onClick={handleClick}
                            variant="contained"
                        >
                            {nombre}
                        </Button>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={openlogin}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={hanledlogout}>Cerrar sesión</MenuItem>
                        </Menu>

                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }} open={open}>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            px: [1],
                        }}
                    >
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <MainListItems openlist={open} setOpen={setOpen} />

                </Drawer>

                <MuiDrawer variant="temporary" open={open} sx={{ display: { xs: 'block', sm: 'block', md: 'none' } }} onClose={toggleDrawer}>
                    <Toolbar
                        sx={{
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            px: [1],
                        }}
                    >
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <MainListItems openlist={open} setOpen={setOpen} />

                </MuiDrawer>

                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />

                    <Container sx={{ mt: 4, mb: 4 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} >
                                <Paper
                                    sx={{
                                        p: 2,
                                        flexDirection: 'column',
                                    }}
                                >

                                    <Routes>

                                        <Route exact path='/bibliotecadigital' element={<Home />} />
                                        <Route exact path='/mis_libros' element={<GestionarMisLibros />} />
                                        <Route exact path='/mis_autores' element={<GestionarMisAutores />} />

                                        <Route path='/*' element={<Home />} />

                                    </Routes>

                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>

                </Box>
            </Box>
        </ThemeProvider>

    </>
}