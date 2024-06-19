import Container from "@mui/material/Container";
import { Autocomplete, TextField, Box, Button, Grid, Pagination } from "@mui/material";

import MovieCardComponent from "../components/MovieCardComponent";
import { useCallback, useEffect, useState } from "react";

import {
  getFilms,
  getFilmsWithFilters,
  getPossibleValuesByField,
} from "../api/MoviesListAPI";

import { MovieCard, Genre } from "../interfaces/MovieInterfaces";

import FilterComponent from "../components/FilterComponent";

const MoviesPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [totalCount, setTotalCount] = useState(0);
  const [searchParams, setSearchParams] = useState("");
  const [films, setFilms] = useState<MovieCard[]>();

  const fetchPossibleGenres = async () => {
    try {
      const savedGenres = localStorage.getItem("genres");
      if (!savedGenres) {
        await getPossibleValuesByField("genres.name").then((res) => {
          setGenres(res.data);
          localStorage.setItem("genres", JSON.stringify(res.data));
        });
      } else {
        setGenres(JSON.parse(savedGenres)); // Если данные есть, используем их
      }
    } catch (error) {
      console.error("Ошибка при получении списка жанров:", error);
    }
  };
  const fetchData = useCallback(
    async (currentPage: number, pageSize: number, searchParams: string) => {
      try {
        const savedFilms = localStorage.getItem("films");
        const savedTotal = localStorage.getItem("total");
        if (!savedFilms) {
          await getFilms(currentPage, pageSize, searchParams).then((res) => {
            setFilms(res.data.docs);
            setTotalCount(res.data.total);
            console.log("total", res.data.total);
            localStorage.setItem("films", JSON.stringify(res.data.docs));
            localStorage.setItem("total", JSON.stringify(res.data.total));

          });
        } else {
          setFilms(JSON.parse(savedFilms)); // Если данные есть, используем их
        }
        if (savedTotal) {
          setTotalCount(JSON.parse(savedTotal)); // Если данные есть, используем их
        }
        console.log("Films", films);
      } catch (error) {
        console.error("Ошибка при получении списка фильмов:", error);
      }
    },
    [currentPage, searchParams]
  ); // зависимость от query означает, что fetchFilms будет пересоздана, только когда query изменится

  // Вызывает fetchFilms при первой загрузке компонента и при изменении query
  useEffect(() => {
    setPaginationType("Search");
    fetchData(currentPage, pageSize, searchParams);
    fetchPossibleGenres();
  }, [currentPage]);

  //   const genres = ["Драма", "Комедия", "Триллер", "Фантастика", "Боевик"];
  const [genres, setGenres] = useState<Genre[]>();
  const [selectedGenres, setSelectedGenres] = useState<Genre[]>();
  const [ratingRange, setRatingRange] = useState([0, 10]);
  const [ratingType, setRatingType] = useState<"kp" | "imdb">("kp");
  const [yearRange, setYearRange] = useState([1990, new Date().getFullYear()]);

  const handleGenreChange = (
    event: React.ChangeEvent<{}> | null,
    newValue: Genre[]
  ) => {
    setSelectedGenres(newValue);
  };

  const handleRatingChange = (
    event: React.ChangeEvent<{}> | null,
    newValue: number[]
  ) => {
    setRatingRange(newValue);
  };

  const handleRatingTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRatingType(event.target.value as "kp" | "imdb");
  };

  const handleYearChange = (
    event: React.ChangeEvent<{}> | null,
    newValue: number[]
  ) => {
    setYearRange(newValue);
  };
  const formatRange = (range: Array<Number>) => {
    if (range[0] === range[1]) {
      return String(range[0]);
    } else {
      // Если значения разные, объединяем их через тире
      return `${range[0]}-${range[1]}`;
    }
  };
  const handleApplyFilters = async () => {
    setPaginationType("Filters");
    const params = {
      page: String(currentPage),
      limit: String(pageSize),
      ...(JSON.stringify(yearRange) !==
        JSON.stringify([1990, new Date().getFullYear()]) && {
        year: formatRange(yearRange),
      }),
      ...(JSON.stringify(ratingRange) !== JSON.stringify([0, 10]) && {
        [`rating.${ratingType}`]: formatRange(ratingRange),
      }),

      ...(selectedGenres && {
        "genres.name": selectedGenres.map((genre: Genre) => genre.name),
      }),
    };
    let queryParams = Object.keys(params).reduce((acc, key) => {
      const value = params[key];
      if (Array.isArray(value)) {
        // Если значение является массивом, добавляем каждый элемент отдельно с тем же ключом
        value.forEach((val) => {
          acc += `&${encodeURIComponent(key)}=%2B${encodeURIComponent(val)}`;
        });
      } else {
        // Для не массивов просто добавляем ключ=значение
        acc += `&${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
      }
      return acc;
    }, "");
    queryParams = queryParams.substring(1);
    // console.log(queryParams);
    await getFilmsWithFilters(queryParams).then((res) => {
      setFilms(res.data.docs);
      console.log(res.data.docs);
    });
  };
  const handleResetFilters = () => {
    setRatingRange([0, 10]);
    setYearRange([1990, new Date().getFullYear()]);
  };

  const [paginationType, setPaginationType] = useState("");
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    console.log('change')
    setCurrentPage(value);
};
  return (
    // <>
    <Container sx={{ marginTop: "5%" }}>
      <Box
        sx={{
          p: 2,
          border: "1px solid #eee",
          borderRadius: "8px",
          boxShadow: "1px 1px 10px rgba(0,0,0,0.1)",
        }}
      >
        <Grid container spacing={2}>
          {/* Фильтр по жанру */}
          {genres && (
            <Grid item xs={12}>
              <Autocomplete
                multiple
                options={genres}
                onChange={handleGenreChange}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Выберите жанры"
                    placeholder="Жанры"
                    fullWidth
                  />
                )}
              />
            </Grid>
          )}
          {/* Фильтр по рейтингу */}
          <Grid item xs={12}>
            <FilterComponent
              filterName="Рейтинг"
              value={ratingRange}
              change={handleRatingChange}
              min={0}
              max={10}
              ratingType={ratingType}
              handleRatingTypeChange={handleRatingTypeChange}
            />
          </Grid>
          {/* Фильтр по году выпуска */}
          <Grid item xs={12}>
            <FilterComponent
              filterName="Год выпуска"
              value={yearRange}
              change={handleYearChange}
              min={1990}
              max={new Date().getFullYear()}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleApplyFilters}
              sx={{ py: 1 }} // Увеличиваем высоту кнопки
            >
              Применить фильтры
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              fullWidth
              variant="outlined"
              color="secondary"
              onClick={handleResetFilters}
              sx={{ py: 1 }} // Увеличиваем высоту кнопки
            >
              Сбросить фильтры
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={2}>
        {films?.map((movie: MovieCard) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
            <MovieCardComponent movie={movie} />
          </Grid>
        ))}
      </Grid>
      {films && (<Grid container spacing={2} justifyContent="center" sx={{ mt: 3 }}>
        <Pagination
          count={totalCount / pageSize}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          showFirstButton
          showLastButton
        />
      </Grid>)}
    </Container>
    // </>
  );
};
export default MoviesPage;
