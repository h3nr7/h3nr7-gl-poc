import * as React from "react";
import { hot } from "react-hot-loader";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ParallaxProvider } from 'react-scroll-parallax';
import { App } from "../app";
import { GlCanvas } from '../components/glcanvas';
import { Home } from './home';
import { Delaunay } from './delaunay';
import { Convexhull } from './convexhull';
import { Polyhedron } from './polyhedron';


const AppRouterComponent: React.StatelessComponent<{}> = () => {
    return (
        <ParallaxProvider>
            {/* <GlCanvas />  */}
            <BrowserRouter>
                <App>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        {/* <Route exact oath="/polygon" component={Polygon} /> */}
                        <Route exact path="/polyhedron" component={Polyhedron} />
                        <Route exact path="/convexhull/2d" component={Convexhull} />
                    </Switch>
                </App>
            </BrowserRouter>
        </ParallaxProvider>
    );
};

export const AppRouter = hot(module)(AppRouterComponent);