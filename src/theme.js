import {createMuiTheme} from "@material-ui/core";

const theme = createMuiTheme({
    palette: {
        primary: {
            main:"#17a2b8",
        },
        secondary: {
            main:"#000"
        },
    },
    typography: {
        fontFamily: [
            '"Nunito"',
            '"Helvetica Neue"',
            '"Arial"',
            '"sans-serif"',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"'
        ].join(","),
    }

});

export default theme