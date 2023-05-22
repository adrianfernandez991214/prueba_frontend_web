import { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, TextField, CardActionArea, CardMedia } from '@mui/material';
import libro_foto from '../../assets/libro_foto.jpg'
import { useDispatch, useSelector } from 'react-redux';
import { paginaActual } from '../../actions/auth';
import { Descargar_archivo_libro, Libos_get_todos } from '../../actions/libro';

const Home = () => {

  const Dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    Dispatch(paginaActual("Biblioteca Digital"))
    Dispatch(Libos_get_todos());
  }, [Dispatch]);

  const { libros } = useSelector(state => state.libro);

  const filteredCards = libros.filter((card) =>
    card.titulo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <TextField
        label="Biblioteca Digital"
        value={searchTerm}
        onChange={handleSearchChange}
        fullWidth
        margin="normal"
      />
      <Grid container spacing={2}>
        {filteredCards.map((card) => (
          <Grid item xs={12} sm={6} md={4} key={card._id} onClick={e => (Dispatch(Descargar_archivo_libro(card)))}>
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={libro_foto}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {card.titulo}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Genero: {card.genero}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Año: {card.anno}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default Home;