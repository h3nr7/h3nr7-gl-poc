import * as React from 'react';
import { useRef } from 'react';
import GlPoly from './polyhedra'; 
import { ContainerDiv, InfoDiv } from '../../styles/base.styles';

import info from './info.md';

import { Markdown } from '../markdown';

export interface IPolyhedra {

}

export const Polyhedra:React.FC<IPolyhedra> = ({}) => {

    const containerRef = useRef<HTMLDivElement>();

    console.log(typeof info);

    return (
        <ContainerDiv ref={containerRef}>
            {/* <Canvas ref={canvasRef} /> */}
            <InfoDiv>
                <Markdown source={info}/>
            </InfoDiv>
        </ContainerDiv>
    );
};

