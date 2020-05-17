import * as React from 'react';
import { hot } from 'react-hot-loader';

import { IHome } from './home.interface';

const HomeComp:React.FunctionComponent<IHome> = () => {

    return <div>Home now</div>;
}

export const Home = hot(module)(HomeComp);