import { createMuiTheme, ThemeOptions } from '@material-ui/core/styles';
import { grey, green } from '@material-ui/core/colors';

export default function brandedTheme(options: ThemeOptions) {
    return createMuiTheme({
        palette: {
            common: { 
                black: "#0e1326", 
                white: "#e9eaef" 
            },
            primary: {
                light: "#9ba3c2",
                main: "#374785",
                dark: "#24305E",
                contrastText: "#ebedf3"
            },
            secondary: {
                light: "#fae9bd",
                main: "#f8e9a1",
                dark: "#322d20",
                contrastText: "fefcf6"
            },
            error: {
                light: "#fbb6b6",
                main: "#F76C6C",
                dark: "#4a2020",
                contrastText: "fef0f0"
            },
            text: {
                primary: "rgba(0, 0, 0, 0.87)",
                secondary: "rgba(0, 0, 0, 0.54)",
                disabled: "rgba(0, 0, 0, 0.38)",
                hint: "rgba(0, 0, 0, 0.38)"
            },
            grey: {
                50: "#fafafa",
                100: "#f5f5f5",
                200: "#eeeeee",
                300: "#e0e0e0",
                400: "#bdbdbd",
                500: "#9e9e9e",
                600: "#757575",
                700: "#616161",
                800: "#424242",
                900: "#212121",
                A700: "#616161",
                A100: "#d5d5d5",
                A400: "#303030",
                A200: "#aaaaaa"
            },
            tonalOffset: 0.2,
            background: { 
                paper: "#fff", 
                default: "#fafafa" 
            }
        },
        shape: {
            borderRadius: 2
        },
        ...options
    });
}