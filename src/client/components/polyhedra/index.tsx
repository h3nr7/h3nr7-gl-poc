import * as React from 'react';
import { useRef } from 'react';
import GlPoly from './polyhedra'; 
import { ContainerDiv } from '../../styles/base.styles';


export interface IPolyhedra {

}

export const Polyhedra:React.FC<IPolyhedra> = ({}) => {

    const containerRef = useRef<HTMLDivElement>();


    return (
        <ContainerDiv ref={containerRef}>
            {/* <Canvas ref={canvasRef} /> */}
        </ContainerDiv>
    );
};

