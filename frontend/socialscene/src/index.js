import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/helper/App';
import "./styling/fonts/Helvetica.ttf";
import "./styling/fonts/Helvetica-Light.ttf";
import "./styling/fonts/Helvetica-Oblique.ttf";
import "./styling/fonts/Helvetica-Bold.ttf";
import "./styling/fonts/Helvetica-BoldOblique.ttf";
import {createTheme, ThemeProvider} from "@mui/material";
import {hover} from "@testing-library/user-event/dist/hover";

const theme = createTheme({
  palette: {
      primary: {
          main: '#FF0000',
      },
    },

    components: {
      MuiButtonBase: {
          defaultProps: {
              disableRipple: true,
          },
          styleOverrides: {
              root: {
                   borderRadius: "0rem !important",
              },
          },
      },
        MuiOutlinedInput: {
              styleOverrides: {
                  root: {
                      borderRadius: "0rem",
                  },
                  notchedOutline: {
                      borderColor: "#000000",
                  },
              },
      },
        MuiRating: {
          styleOverrides:{
              root:{
                  color: "#FF0000",
              }
          }

        },
        MuiCard: {
          styleOverrides: {
              root:{
                  borderRadius: "0rem !important",


              }
          }
        },

        MuiCardActionArea: {
          styleOverrides: {
              root: {
                  borderRadius: "0rem !important",
                  //  border: "2px solid black",
                  // borderColor: "#FF0000",
                  // borderWidth: "thin"
              },
          }
        },

      MuiInputLabel: {
          styleOverrides: {
              root:{
                  fontWeight: "bold",
              }
          }
      }
  },

    typography: {
       typography: {
           fontFamily: [
               '-apple-system',
               'BlinkMacSystemFont',
               '"Segoe UI"',
               'Roboto',
               '"Helvetica Neue"',
               'Arial',
               'sans-serif',
               '"Apple Color Emoji"',
               '"Segoe UI Emoji"',
               '"Segoe UI Symbol"',
           ].join(',')
       },
    }
});

ReactDOM.render(
    <ThemeProvider theme={theme}>  
      <App/>
    </ThemeProvider>,
  document.getElementById('root')
);
