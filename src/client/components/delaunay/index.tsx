import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { Delaunay as DelaunayObj } from './delaunay';
import { IDelaunay } from './delaunay.interface';
import { useResize } from '../../helper/resize.hook'
import { ContainerDiv } from '../../styles/base.styles';
import { hot } from 'react-hot-loader';

const DelaunayComp:React.FC<IDelaunay> = ({}) => {

    type AlgorithmType = DelaunayObj;

    // all refs
    const canvasRef = useRef<HTMLCanvasElement>();
    const containerRef = useRef<HTMLDivElement>();
    const classRef = useRef<DelaunayObj>();
    const size = useResize(containerRef, undefined);

    useEffect(() => {
        const container = containerRef.current;
        let canvasInstance:AlgorithmType;


        container.appendChild(canvasInstance.renderer.domElement);
        canvasInstance.animate();
        classRef.current = canvasInstance;
        classRef.current.updateSize(size);

        return ():void => {
            if(canvasInstance) {
                container.removeChild(canvasInstance.renderer.domElement);
                canvasInstance.destroy();
            }
        }

    }, []);

    useEffect(() => {
        if(classRef.current) classRef.current.updateSize(size);
    }, [size])



    return (
        <ContainerDiv ref={containerRef}>
            {/* <Canvas ref={canvasRef} /> */}
        </ContainerDiv>
    );
}

export const Delaunay = hot(module)(DelaunayComp);