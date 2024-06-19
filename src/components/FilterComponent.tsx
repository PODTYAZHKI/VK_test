import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  Slider,
  Typography,
} from "@mui/material";

interface FilterFieldProps {
  filterName: string;
  change: (event, value) => void;
  value: number[];
  min: number;
  max: number;
  ratingType?: "kp" | "imdb"; // Тип выбранного рейтинга
  handleRatingTypeChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FilterComponent: React.FC<FilterFieldProps> = ({
  filterName,
  value,
  change,
  min,
  max,
  ratingType,
  handleRatingTypeChange,
}) => {
  return (
    <>
      <Typography gutterBottom>{filterName}</Typography>
      {ratingType && (
        <RadioGroup
          row
          value={ratingType}
          onChange={handleRatingTypeChange}
          name="rating-type-group"
          sx={{ mb: 2 }} // Добавляем нижний отступ для группы радиокнопок
        >
          <FormControlLabel value="kp" control={<Radio />} label="КиноПоиск" />
          <FormControlLabel value="imdb" control={<Radio />} label="IMDb" />
        </RadioGroup>
      )}
      <Slider
        value={value}
        onChange={change}
        valueLabelDisplay="auto"
        min={min}
        max={max}
      />
    </>
  );
};

export default FilterComponent;
