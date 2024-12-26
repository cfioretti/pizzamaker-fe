import {createTheme} from '@material-ui/core/styles';

const theme = createTheme({
    palette: {
        primary: { main: '#266f80' },
        secondary: { main: '#223b59' }
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
