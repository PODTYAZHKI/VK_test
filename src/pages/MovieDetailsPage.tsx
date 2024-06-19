import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PlaceholderImage from "../assets/noPoster.png";

import {
  MovieCard
  
} from "../interfaces/MovieInterfaces";

import { Avatar, Box, Button, Chip, Grid, List, Paper, Typography } from "@mui/material";
import {
  getMovieById,
  getSeasonsById,
  getPostersById,
  getReviewById,
} from "../api/MovieDetailsAPI";

const MovieDetailsPage: React.FC = () => {
  const [movie, setMovie] = useState<MovieCard>();

  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  const fetchData = async () => {
    await getMovieById(Number(id)).then(async (res) => {
      setMovie(res.data);
	  console.log("setMovie", res.data);
    })
  };

  useEffect(() => {
    fetchData();
  }, [id]);
  if (!movie) {
    return <div>Загрузка информации о фильме...</div>;
  }

  return (
    <Box sx={{ p: 2 }}>
      <Button variant="outlined" onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        Назад
      </Button>

      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Box
              component="img"
              sx={{
                width: "100%",
                height: "auto",
                borderRadius: "8px",
                boxShadow: "1px 1px 12px rgba(0,0,0,0.2)",
              }}
              src={movie.poster ? movie.poster.url : PlaceholderImage} // используйте заглушку для src, если постер отсутствует
              alt={movie.name}
            />
          </Grid>

          <Grid item xs={12} md={8}>
            <Typography variant="h4" gutterBottom>
              {movie.name}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1, textAlign: "justify" }}>
              {movie.description}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              
			  <b>Рейтинги: KP:</b> {movie.rating.kp || "Н/Д"}, IMDB:{" "}
              {movie.rating.imdb || "Н/Д"}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
			<b>Дата выхода:</b> {movie.year || "Неизвестно"}
            </Typography>

            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
              {movie.genres.map((genre, index) => (
                <Chip key={index} label={genre.name} variant="outlined" />
              ))}
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default MovieDetailsPage;
