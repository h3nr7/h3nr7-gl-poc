import * as React from 'react';
import { Container } from './terrain.styles';
import { ITerrain } from './terrain.interface'
import { Delaunay } from '../../components/delaunay';
import { hot } from 'react-hot-loader';

const TerrainComp:React.FC<ITerrain> = ({}) => {

    return (
        <div>
            <Delaunay />
        </div>
    );
}

export const Terrain = hot(module)(TerrainComp);