import * as React from 'react';
import { useEffect, useRef } from 'react';
import * as Three from 'three';
import { IGlCanvasProps, ISize } from './glcanvas.interface';
import { useResize } from './resize.hook'
import { ContainerDiv, Canvas } from './glcanvas.styles';
import Terrain from './terrain';
import { hot } from 'react-hot-loader';

const GlCanvasComp:React.FC<IGlCanvasProps> = ({}) => {

    // all refs
    const canvasRef = useRef<HTMLCanvasElement>();
    const containerRef = useRef<HTMLDivElement>();
    const terrainRef = useRef<Terrain>();
    const size = useResize(containerRef, undefined);

    useEffect(() => {
        const container = containerRef.current;
        const terrainInstance = new Terrain(canvasRef.current);
        container.appendChild(terrainInstance.renderer.domElement);
        terrainInstance.animate();
        terrainRef.current = terrainInstance;

        return ():void => {
            container.removeChild(terrainInstance.renderer.domElement);
            terrainInstance.destroy();
        }

    }, []);

    useEffect(() => {
        terrainRef.current.updateSize(size);
    }, [size])



    return (
        <ContainerDiv ref={containerRef}>
            <Canvas ref={canvasRef} />
        </ContainerDiv>
    );
}

export const GlCanvas = hot(module)(GlCanvasComp);