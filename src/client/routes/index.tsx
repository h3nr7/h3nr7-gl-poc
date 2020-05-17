import * as React from "react";
import { hot } from "react-hot-loader";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ParallaxProvider } from 'react-scroll-parallax';
import { App } from "../app";

import { Home } from './home';


const AppRouterComponent: React.StatelessComponent<{}> = () => {
    return (
        <ParallaxProvider>
            <BrowserRouter>
                <App>
                    <Switch>
                        <Route exact path="/" component={Home} />
                    </Switch>
                </App>
            </BrowserRouter>
        </ParallaxProvider>
    );
};

export const AppRouter = hot(module)(AppRouterComponent);