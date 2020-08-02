import * as React from 'react';
import { hot } from 'react-hot-loader';
import IFlocking from './flocking.interface';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({

}));

const FlockingComp:React.FC<IFlocking> = () => {

    return (
        <div></div>
    )
}

export const Flocking = hot(FlockingComp)(module);

