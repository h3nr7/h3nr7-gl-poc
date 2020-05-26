import * as React from "react";
import { render } from "react-dom";
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { AppRouter } from "./routes";
import brandedTheme from './styles/brandedTheme';

const root = document.createElement("div");
document.body.appendChild(root);
const theme = brandedTheme({});
render(
    <ThemeProvider theme={theme}>
        <CssBaseline>
            <AppRouter />
        </CssBaseline>
    </ThemeProvider>, root);
    