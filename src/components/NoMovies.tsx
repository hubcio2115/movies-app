import { FC } from "react";
import { Box, Typography } from "@mui/material";

interface Props {
  isFavorites?: boolean;
}

const NoMovies: FC<Props> = ({ isFavorites = false }) => {
  let header;
  let subtitle;

  if (isFavorites) {
    header = "Nie masz żadnych ulubionych. ";
    subtitle = "Dodaj jakieś filmy aby zobaczyć je na tej liście!";
  } else {
    header = "Nie mam żadnych filmów. ☹️";
    subtitle =
      "Coś poszło nie tak... Może spróbuj zmienić kryteria wyszukiwania?";
  }

  return (
    <Box>
      <Typography variant="h6">{header}</Typography>
      <Typography variant="subtitle1">{subtitle}</Typography>
    </Box>
  );
};

export default NoMovies;
