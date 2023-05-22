import React from 'react';
import { List, ListItemText, ListItemIcon, ListItemButton } from '@mui/material';
import { Home, Attribution, MenuBook } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';



export const MainListItems = ({ openlist, setOpen }) => {

  return (
    <List component="nav">
      <NavLink to='bibliotecadigital'>
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
            <MenuBook color='primary' />
          </ListItemIcon>
          <ListItemText primary="Gestionar mis libros" />
        </ListItemButton>
      </NavLink>
    </List>
  )
};
