import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { Delaunay as DelaunayObj } from './delaunay';
import { IDelaunay } from './delaunay.interface';
import { useResize } from '../../helper/resize.hook'
import { ContainerDiv } from '../../styles/base.styles';
import { hot } from 'react-hot-loader';

const DelaunayComp:React.FC<IDelaunay> = ({}) => {

    // all refs
    const canvasRef = useRef<HTMLCanvasElement>();
    const containerRef = useRef<HTMLDivElement>();
    const classRef = useRef<DelaunayObj>();
    const size = useResize(containerRef, undefined);
    const [pointData, setPointData] = useState([]);

    useEffect(() => {

        let canvasInstance:DelaunayObj;
        const container = containerRef.current;

    
        const init = async () => {
            const res = await Promise.all([
                fetch('/api/geo/gdal?url=http://localhost:3000/static/N51W001.tif&w=240&h=240'),
                fetch('/api/geo/gdal?url=http://localhost:3000/static/N51E000.tif&w=240&h=240')
            ]);

        
            const datum = await Promise.all(res.map(r => r.json()));
            setPointData(datum);
            canvasInstance = new DelaunayObj(canvasRef.current, datum);
            container.appendChild(canvasInstance.renderer.domElement);
            canvasInstance.animate();
            classRef.current = canvasInstance;
            classRef.current.updateSize(size);
        };

        init();

        return ():void => {
            if(canvasInstance) {
                container.removeChild(canvasInstance.renderer.domElement);
                canvasInstance.destroy();
            }
        }

    }, []);

    useEffect(() => {
        if(classRef.current) classRef.current.updateSize(size);
    }, [size, pointData])



    return (
        <ContainerDiv ref={containerRef} />
    );
}

export const Delaunay = hot(module)(DelaunayComp);