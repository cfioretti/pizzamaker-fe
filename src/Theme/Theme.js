import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {main: '#266f80'},
    secondary: {main: '#223b59'},
    error: {main: '#f4896f'},
  },
  typography: {
    h3: {
      fontSize: '1.5rem',
      '@media (min-width:600px)': {
        fontSize: '2rem',
      }
    }
  },
  spacing: factor => `${0.25 * factor}rem`
});

export default theme;
