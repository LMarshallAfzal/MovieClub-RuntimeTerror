import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/core/App';
import "./styling/core/base.css";
import Helvetica from "./resources/newfonts/Helvetica.ttf";
import {createTheme, ThemeProvider} from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: '#FF0000',
        },
        text: {}
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
                    fontFamily: 'Helvetica',
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
                    fontFamily: 'Helvetica-Bold',
                },
            }
        },
        MuiInputBase: {
            styleOverrides: {}
        }
    },

    typography: {
        typography: {
            fontFamily: [
                'Helvetica',
                'Helvetica-Italic',
                'Helvetica-Light',
                'Helvetica-Light-Italic',
                'Helvetica-Bold',
                'helvetica-Bold-Italic',
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                '"Helvetica Neue"',
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
