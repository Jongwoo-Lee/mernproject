import { createMuiTheme } from "@material-ui/core/styles";

export default createMuiTheme({
  palette: {
    primary: {
      main: "#263238"
    },
    secondary: {
      contrastText: "#FAFAFA",
      main: "#4CAF50" // Indigo is probably a good match with pink
    }
  }
});
