import * as React from 'react';
import { Container } from './polyhedron.styles';
import { IPolyhedron } from './polyhedron.interface'
import { Polyhedra } from '../../components/polyhedra';
import { hot } from 'react-hot-loader';

const PolyhedronComp:React.FC<IPolyhedron> = ({}) => {

    return (
        <div>
            <Polyhedra />
        </div>
    );
}

export const Polyhedron = hot(module)(PolyhedronComp);