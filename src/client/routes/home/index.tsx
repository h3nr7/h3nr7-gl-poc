import * as React from 'react';
import { hot } from 'react-hot-loader';

import { IHome } from './home.interface';

const HomeComp:React.FunctionComponent<IHome> = () => {

    return <div><img src="https://www.codewars.com/users/henryyp/badges/micro" /></div>;
}

export const Home = hot(module)(HomeComp);