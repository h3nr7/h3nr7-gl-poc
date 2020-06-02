import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import * as Three from 'three';
import { IConvexhullProps } from './convexhull.interface';
import { useResize } from '../../helper/resize.hook'
import { ContainerDiv } from '../../styles/base.styles';
import QHull2D from './qhull2d';
import JarvisMarch from './jarvismarch'
import { hot } from 'react-hot-loader';
import { OPTIONS } from './convexhull.interface';

const ConvexhullComp:React.FC<IConvexhullProps> = ({renderOption, reload}) => {

    type AlgorithmType = QHull2D | JarvisMarch;

    // all refs
    const canvasRef = useRef<HTMLCanvasElement>();
    const containerRef = useRef<HTMLDivElement>();
    const classRef = useRef<AlgorithmType>();
    const size = useResize(containerRef, undefined);

    const picker = (
        curContainer:HTMLDivElement, 
        canvasInstance: AlgorithmType
    ):void => {
        curContainer.appendChild(canvasInstance.renderer.domElement);
        canvasInstance.animate();
        classRef.current = canvasInstance;
        classRef.current.updateSize(size);
    }

    useEffect(() => {
        const container = containerRef.current;
        let canvasInstance:AlgorithmType;
        switch(renderOption) {
            case OPTIONS.qhull2d:
                canvasInstance = new QHull2D(canvasRef.current);
                break;
            case OPTIONS.jarvismarch:
                canvasInstance = new JarvisMarch(canvasRef.current);
                break;
            default:
                canvasInstance = null;
                break;
        }

        if(container && canvasInstance) picker(container, canvasInstance);

        return ():void => {
            if(canvasInstance) {
                container.removeChild(canvasInstance.renderer.domElement);
                canvasInstance.destroy();
            }
        }

    }, [renderOption, reload]);

    useEffect(() => {
        if(classRef.current) classRef.current.updateSize(size);
    }, [size])



    return (
        <ContainerDiv ref={containerRef}>
            {/* <Canvas ref={canvasRef} /> */}
        </ContainerDiv>
    );
}

export const Convexhull = hot(module)(ConvexhullComp);