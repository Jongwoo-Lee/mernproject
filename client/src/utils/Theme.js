import { createMuiTheme } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";

export default createMuiTheme({
  palette: {
    primary: {
      main: "#263238"
    },
    secondary: green // Indigo is probably a good match with pink
  }
});
