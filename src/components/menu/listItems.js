import React from 'react';
import { List, ListSubheader, ListItemText, ListItemIcon, ListItemButton } from '@mui/material';
import { Home, PersonAddAltRounded, LibraryBooks, Attribution } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';



export const MainListItems = ({ openlist, setOpen }) => {

  return (
    <List component="nav">
      <NavLink to='Home'>
        <ListItemButton>
          <ListItemIcon>
            <Home color='primary' />
          </ListItemIcon>
          <ListItemText primary="Página principal" />
        </ListItemButton>
      </NavLink>
      <NavLink to='mis_autores'>
        <ListItemButton>
          <ListItemIcon>
            <Attribution color='primary' />
          </ListItemIcon>
          <ListItemText primary="Gestionar mis autores" />
        </ListItemButton>
      </NavLink>
      <NavLink to='mis_libros'>
        <ListItemButton>
          <ListItemIcon>
            <LibraryBooks color='primary' />
          </ListItemIcon>
          <ListItemText primary="Gestionar mis libros" />
        </ListItemButton>
      </NavLink>
    </List>
  )
};

export const SecondaryListItems = () => {

  return (
    <List component="nav">

      <ListSubheader component="div" inset>
        Configuraciíon
      </ListSubheader>
      <NavLink to='Crear_Usuario'>
        <ListItemButton>
          <ListItemIcon>
            <PersonAddAltRounded color='primary' />
          </ListItemIcon>
          <ListItemText primary="Crear usuario" />
        </ListItemButton>
      </NavLink>
    </List>
  )
};