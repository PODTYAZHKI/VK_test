import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";
import { MovieCard } from "../interfaces/MovieInterfaces";

import PlaceholderImage from "../assets/noPoster.png";

const MovieCardComponent: React.FC<{ movie: MovieCard | any }> = ({
  movie,
}) => {
  const navigate = useNavigate();
  const moviePath = `/movies/${movie.id}`;

  return (
    <Card
      sx={{
        cursor: "pointer",
        position: "relative",
        borderRadius: "4px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)",
        "&:hover": {
          boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.3)",
        },
      }}
      onClick={() => {
        navigate(moviePath);
      }}
    >
      <CardMedia
        component="img"
        image={movie.poster ? movie.poster.url : PlaceholderImage}
        alt={movie.name}
        sx={{
          height: '100%',
          objectFit: "cover",
          borderRadius: "5px",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          color: "white",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          padding: "5px 0",
          textAlign: "center",
          borderRadius: "0 0 5px 5px",
        }}
      >
        <Typography variant="body2">{movie.name}</Typography>
        {movie.rating && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              color: "white",
            }}
          >
            <Typography variant="body2">IMDb: {movie.rating.imdb}</Typography>
            <Typography variant="body2">KP: {movie.rating.kp}</Typography>
          </Box>
        )}
      </Box>
      <Box
        sx={{
          position: "absolute",
          top: "5px",
          left: "5px",
          color: "white",
          backgroundColor: "rgba(0, 0, 0, 0.75)",
          padding: "2px 5px",
          borderRadius: "4px",
        }}
      >
        <Typography variant="body2">{movie.year}</Typography>
      </Box>
    </Card>
  );
};

export default MovieCardComponent;
