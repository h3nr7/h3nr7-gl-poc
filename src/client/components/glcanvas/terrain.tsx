import * as React from 'react';
import { WebGLRenderer, PerspectiveCamera, Group, Scene, Mesh, BoxGeometry, MeshBasicMaterial, MathUtils, BufferGeometry, Float32BufferAttribute, PointsMaterial, Points, LineBasicMaterial, Line } from 'three';

import { ObjectName, ISize, IPosition } from './glcanvas.interface';
import { render } from 'react-dom';
import { hot } from 'react-hot-loader';

export default class Terrain {
    scene: Scene;
    camera: PerspectiveCamera; 
    renderer: WebGLRenderer;
    animationFrameId: number;

    constructor(canvas: HTMLCanvasElement) {
        const renderer = new WebGLRenderer({
            alpha: false,
            antialias: true,
            canvas
        });

        const camera = new PerspectiveCamera();
        const terrainPoints = new Mesh();
        const terrain = new Group();
        const scene = new Scene();

        // name object
        camera.name = ObjectName.Camera;
        terrain.name = ObjectName.Terrain;
        scene.name = ObjectName.Scene;


        // set camera pos
        camera.position.z = 5;

        let points:IPosition[] = [];
        let totPoints = 50
        for ( let i=0; i<totPoints; i++) {
            let pos:IPosition = [
                MathUtils.randFloatSpread(100), 
                MathUtils.randFloatSpread(100), 
                -200
            ];
            points.push(pos);
        }

        // let pMin:IPosition = [Infinity, Infinity, -200];
        // let pMax:IPosition = [-Infinity, -Infinity, -200];

        // for(let j=0; j<totPoints; j++) {
        //     pMin[0] = Math.min(points[j][0], pMin[0]);
        //     pMin[1] = pMin[0]===points[j][0] ? points[j][1] : pMin[1];

        //     pMax[0] = Math.max(points[j][0], pMax[0]);
        //     pMax[1] = pMax[0]===points[j][0] ? points[j][1] : pMax[1];            
        // }

        // console.log('kaka', pMin, pMax);

        function findMinMaxPoint(
            allPoints:IPosition[], 
            removeMinMaxPoints:boolean = false
        ):{minPoint: IPosition, maxPoint: IPosition, indexes:number[]} {

            
            let minIndex:number = -1;
            let maxIndex:number = -1;
            let minPoint:IPosition = [Infinity, Infinity, -200];
            let maxPoint:IPosition = [-Infinity, -Infinity, -200];
    
            for(let j=0; j<totPoints; j++) {
                minPoint[0] = Math.min(points[j][0], minPoint[0]);
                maxPoint[0] = Math.max(points[j][0], maxPoint[0]);

                if(minPoint[0]===points[j][0]) { 
                    minIndex = j;
                    minPoint[1] = points[j][1];
                }
                
                if(maxPoint[0]===points[j][0]) {
                    maxIndex = j;
                    maxPoint[1] = points[j][1];     
                }     
            }  

            let indexes:number[] = [];
            if(maxIndex > -1) indexes.push(maxIndex);
            if(minIndex > -1) indexes.push(minIndex);
            return {minPoint, maxPoint, indexes};
        }

        const {minPoint, maxPoint, indexes} = findMinMaxPoint(points, true);

        function calDot(p0:IPosition, p1:IPosition, p2:IPosition) {
            const a = p1[0] - p0[0];
            const b = p1[1] - p0[1];
            const c = b/a * p0[0];

            return Math.abs(a*p2[0] + b*p2[1] + c) / Math.sqrt(a*a + b*b);
        }

        function removePointsByIndexes(indexes:number[], arr:IPosition[]):IPosition[] {
            const newArr:IPosition[] = [...arr];
            indexes.sort();
            // very elegant solution to splice with indexes sort
            while(indexes.length) {
                newArr.splice(indexes.pop(), 1);
            }
            return newArr;
        }

        let distance:number[] = [];
        for(let p of points) {
            distance.push(calDot(minPoint, maxPoint, p));
        }
        
        const maxDistance:[] = distance.reduce((prev:any, cur:any, index:number) => {
            prev = Math.max(prev[1], cur) === cur ? [index, cur] : prev;
            return prev;
        }, [-1, 0]);

        const newPoints = removePointsByIndexes(indexes, points);
        const vertices = newPoints.flat(1);

        console.log(indexes, maxDistance, newPoints.length, points.length);




        // const dis = 10;
        // for( let i=-50; i<=50; i+=dis) {
        //     let x =i;
        //     for( let j=-50; j<=50; j+=dis) {
        //         let y = j;
        //         let z = -200;
        //         vertices.push(x,y,z);
        //     }
        // }


        const lineGeo = new BufferGeometry();
        lineGeo.setAttribute('position', new Float32BufferAttribute([...minPoint, ...maxPoint], 3));
        const lineMat = new LineBasicMaterial( { color: 0x0000ff } );
        const hullLines = new Line(lineGeo, lineMat);
        scene.add(hullLines);

        const pointGeo = new BufferGeometry();
        pointGeo.setAttribute('position', new Float32BufferAttribute(vertices, 3));
        const pointMat = new PointsMaterial({ color: 0xEEEEEE });
        const hullPoints = new Points(pointGeo, pointMat);
        scene.add(hullPoints);

        const pPointGeo = new BufferGeometry();
        pPointGeo.setAttribute('position', new Float32BufferAttribute([...minPoint, ...maxPoint], 3));
        const pPointMat = new PointsMaterial({ color: 0xEE0000 });
        const pPoints = new Points(pPointGeo, pPointMat);
        scene.add(pPoints);


        // add to scene
        terrain.add(terrainPoints);

        scene.add(camera);
        scene.add(terrain);

        // assign values to class vars
        this.camera = camera;
        this.scene = scene;
        this.renderer = renderer;

        // updates
    }

    animate(): void {
        this.render();
        this.animationFrameId = requestAnimationFrame(this.animate.bind(this));
    }

    render(): void {
        this.renderer.render(this.scene, this.camera);
    }

    updateSize(size?: ISize): void {
        if(size) {
            const [width, height] = size;
            this.renderer.setSize(width, height);
            this.camera.aspect = width/height;
        }

        this.camera.updateProjectionMatrix();
    }

    destroy():void {
        cancelAnimationFrame(this.animationFrameId);
    }

}

const dummyFunc:React.StatelessComponent<{}> = () => <div/>;
export const dummy = hot(module)(dummyFunc);
