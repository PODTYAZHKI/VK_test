import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import MoviesPage from "./pages/MoviesPage";
import MovieDetailsPage from "./pages/MovieDetailsPage";

const App: React.FC = () => {
  return (
    <Router>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Movies
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Box>
        <Routes>
          <Route path="/" element={<MoviesPage />} />
          <Route path="/movies/:id" element={<MovieDetailsPage />} />
        </Routes>
      </Box>
    </Router>
  );
};

export default App;
