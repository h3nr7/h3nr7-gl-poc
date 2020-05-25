import { WebGLRenderer, PerspectiveCamera, Group, Scene, Mesh, BoxGeometry, MeshBasicMaterial, MathUtils, BufferGeometry, Float32BufferAttribute, PointsMaterial, Points, LineBasicMaterial, Line } from 'three';
import { ObjectName, ISize, IPosition } from './glcanvas.interface';
import BaseGlContainer from './glcontainer.base';
import { calOrthDistance } from './glmath.helper';
export default class Terrain extends BaseGlContainer {

    totPoints:number = 50;
    points:IPosition[] = [];


    constructor(canvas: HTMLCanvasElement) {
        super(canvas);

        const terrainPoints = new Mesh();
        const terrain = new Group();
        terrain.name = ObjectName.Terrain;

        // set camera pos
        this.camera.position.z = 5;
        // create set of random points
        for ( let i=0; i<this.totPoints; i++) {
            let pos:IPosition = [
                MathUtils.randFloatSpread(100), 
                MathUtils.randFloatSpread(100), 
                -200
            ];
            this.points.push(pos);
        }


        const {minPoint, maxPoint, indexes} = this.findMinMaxPoint(this.points, true);
        let newPoints = this.removePointsByIndexes(indexes, this.points);

        let distance:number[] = [];
        for(let p of newPoints) {
            distance.push(calOrthDistance(minPoint, maxPoint, p));
        }
        
        const maxDistance:[number, number] = distance.reduce((prev:any, cur:any, index:number) => {
            prev = Math.max(prev[1], cur) === cur ? [index, cur] : prev;
            return prev;
        }, [-1, 0]);

        const vertices = newPoints.flat(1);


        const oldPoints = [...minPoint, ...maxPoint, ...newPoints[maxDistance[0]]]

        newPoints = this.removePointsByIndexes([maxDistance[0]], newPoints);


        console.log(indexes, maxDistance, distance);


        const lineGeo = new BufferGeometry();
        lineGeo.setAttribute('position', new Float32BufferAttribute([...oldPoints, ...minPoint], 3));
        const lineMat = new LineBasicMaterial( { color: 0x0000ff } );
        const hullLines = new Line(lineGeo, lineMat);
        this.scene.add(hullLines);

        const pointGeo = new BufferGeometry();
        pointGeo.setAttribute('position', new Float32BufferAttribute(vertices, 3));
        const pointMat = new PointsMaterial({ color: 0xEEEEEE });
        const hullPoints = new Points(pointGeo, pointMat);
        this.scene.add(hullPoints);

        const pPointGeo = new BufferGeometry();
        pPointGeo.setAttribute('position', new Float32BufferAttribute(oldPoints, 3));
        const pPointMat = new PointsMaterial({ color: 0xEE0000 });
        const pPoints = new Points(pPointGeo, pPointMat);
        this.scene.add(pPoints);


        // add to group
        terrain.add(terrainPoints);

        this.scene.add(this.camera);
        this.scene.add(terrain);


        // updates
    }

    findMinMaxPoint(
        allPoints:IPosition[], 
        removeMinMaxPoints:boolean = false
    ):{minPoint: IPosition, maxPoint: IPosition, indexes:number[]} {

        
        let minIndex:number = -1;
        let maxIndex:number = -1;
        let minPoint:IPosition = [Infinity, Infinity, -200];
        let maxPoint:IPosition = [-Infinity, -Infinity, -200];

        for(let j=0; j<this.totPoints; j++) {
            minPoint[0] = Math.min(this.points[j][0], minPoint[0]);
            maxPoint[0] = Math.max(this.points[j][0], maxPoint[0]);

            if(minPoint[0]===this.points[j][0]) { 
                minIndex = j;
                minPoint[1] = this.points[j][1];
            }
            
            if(maxPoint[0]===this.points[j][0]) {
                maxIndex = j;
                maxPoint[1] = this.points[j][1];     
            }     
        }  

        let indexes:number[] = [];
        if(maxIndex > -1) indexes.push(maxIndex);
        if(minIndex > -1) indexes.push(minIndex);
        return {minPoint, maxPoint, indexes};
    }

    removePointsByIndexes(indexes:number[], arr:IPosition[]):IPosition[] {
        const newArr:IPosition[] = [...arr];
        indexes.sort();
        // very elegant solution to splice with indexes sort
        while(indexes.length) {
            newArr.splice(indexes.pop(), 1);
        }
        return newArr;
    }

}
