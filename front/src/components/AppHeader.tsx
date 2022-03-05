import { FC } from "react";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";

const AppHeader: FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <img src="src/favicon.png" alt="logo" width={25} height={25} />
          <Typography variant="h6" ml={1} height={28}>
            MoviesApp
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default AppHeader;
