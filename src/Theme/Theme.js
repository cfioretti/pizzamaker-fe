import { createMuiTheme } from '@material-ui/core/styles';

const brand = {
  cream:     '#fcf5e0',
  peach:     '#fac5ab',
  coral:     '#f4896f',
  yellow:    '#fdc16d',
  tealLight: '#2c8d93',
  teal:      '#266f80',
  navy:      '#223b59',
  mint:      '#bbe2dd',
  tealAqua:  '#82c4c4',
};

const theme = createMuiTheme({
  palette: {
    primary: {
      main:         brand.teal,        // #266f80
      light:        brand.tealLight,   // #2c8d93
      dark:         brand.navy,        // #223b59
      contrastText: brand.cream,       // #fcf5e0
    },
    secondary: {
      main:         brand.navy,        // #223b59
      light:        brand.tealAqua,    // #82c4c4
      contrastText: brand.cream,       // #fcf5e0
    },
    error:   { main: '#b04e38' },
    warning: { main: brand.yellow },   // #fdc16d
    success: { main: brand.tealAqua }, // #82c4c4
    info:    { main: brand.mint },     // #bbe2dd
    background: {
      default: brand.cream,
      paper:   '#ffffff',
    },
    brand,
  },
  typography: {
    h3: {
      fontSize: '1.5rem',
      '@media (min-width:600px)': {
        fontSize: '2rem',
      },
    },
  },
  spacing: factor => `${0.25 * factor}rem`,
});

export default theme;
