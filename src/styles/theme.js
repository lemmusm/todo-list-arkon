import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  typography: {
    fontFamily: ['Barlow', 'sans-serif'].join(','),
  },
  components: {
    styleOverrides: `
        font-family: 'Barlow'
      `,
  },
});

export default theme;
