import { Divider, Drawer, IconButton, Toolbar } from '@mui/material'
import { ChevronLeft } from '@mui/icons-material'
import React from 'react'
import { MainListItems, SecondaryListItems } from './listItems'

//Componente utilizado en el menu lateral
const DrawerItem = ({ open, toggleDrawer }) => {
    return (
        <>
            <Drawer variant="permanent" open={open}>
                <Toolbar
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        px: [1],
                    }}
                >
                    <IconButton onClick={toggleDrawer}>
                        <ChevronLeft />
                    </IconButton>
                </Toolbar>
                <Divider />
                <MainListItems openlist={open} />
                <Divider sx={{ my: 1 }} />
                <SecondaryListItems />
            </Drawer>

        </>
    )
}

export default DrawerItem
