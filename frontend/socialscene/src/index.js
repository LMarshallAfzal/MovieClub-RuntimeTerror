import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/core/App';
import Helvetica from "./resources/newfonts/Helvetica.ttf";
import HelveticaLight from "./resources/newfonts/Helvetica-Light.ttf";
import HelveticaOblique from "./resources/newfonts/Helvetica-Italic.ttf";
import HelveticaBold from "./resources/newfonts/Helvetica-Bold.ttf";
import HelveticaBoldOblique from "./resources/newfonts/Helvetica-Bold-Italic.ttf";
import {createTheme, ThemeProvider} from "@mui/material";

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
                    // borderRadius: "0rem !important",
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
            styleOverrides: {
                root: {
                    color: "#FF0000",
                }
            }

        },
        MuiCard: {
            styleOverrides: {
                root: {
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

        MuiChip: {
            styleOverrides: {
                root: {
                    // borderRadius: "0rem !important",

                },
            }

        },

        MuiTooltip: {
            styleOverrides: {
                root: {}
            }
        },

        MuiInputLabel: {
            styleOverrides: {
                root: {
                    fontWeight: "bold",
                }
            }
        }
    },

    typography: {
        typography: {
            fontFamily: [
                Helvetica,
                HelveticaLight,
                HelveticaOblique,
                HelveticaBold,
                HelveticaBoldOblique,
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
