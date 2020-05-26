import { 
    Group, Mesh, MathUtils, BufferGeometry, 
    Float32BufferAttribute, PointsMaterial, 
    Points, LineBasicMaterial, Line, 
    Color, Object3D, Vector3  } from 'three';
import { ObjectName } from './glcanvas.interface';
import BaseGlContainer from './glcontainer.base';
import { calOrthDistance, calBaryCentric, findMinMaxPoint } from './glmath.helper';

export default class Terrain extends BaseGlContainer {

    totPoints:number = 20;
    points:Vector3[] = [];

    constructor(canvas: HTMLCanvasElement, hasOrbitControl:boolean) {
        super(canvas, null, hasOrbitControl);

        const terrainPoints = new Mesh();
        const terrain = new Group();
        terrain.name = ObjectName.Terrain;

        // set camera pos
        this.camera.position.z = 200;
        this.camera.lookAt( 0, 0, 0 );

        // create set of random points
        for ( let i=0; i<this.totPoints; i++) {
            let pos:Vector3 = new Vector3(
                MathUtils.randFloatSpread(100), 
                MathUtils.randFloatSpread(100), 
                0
                // MathUtils.randFloatSpread(100)
            );
            this.points.push(pos);
        }


            
        let uIndexes:number[] = this.indexArrGenerator(this.points.length);
        let fIndexes:number[] = [];

        const { minIndex, maxIndex, minPoint, maxPoint } = findMinMaxPoint(this.points);

        let topIndexes:number[] = [];
        let botIndexes:number[] = [];
        for(let i=0; i<this.points.length; i++) {
            const d = calOrthDistance(maxPoint, minPoint, this.points[i]);
            if(d>=0) topIndexes.push(i);
            else botIndexes.push(i);
        }

        topIndexes = topIndexes.filter(i => ![minIndex, maxIndex].includes(i));
        botIndexes = botIndexes.filter(i => ![minIndex, maxIndex].includes(i));
        

        console.log(topIndexes, botIndexes);
        const topOutput = this.stepper(topIndexes, [maxIndex], maxIndex, minIndex);
        const topLine = topOutput.map(item => this.points[item].toArray());

        const botOutput = this.stepper(botIndexes, [minIndex], minIndex, maxIndex);
        const botLine = botOutput.map(item => this.points[item].toArray());

        this.scene.add(this.createLines(topLine.flat(1), 0XFFFF00));
        this.scene.add(this.createLines(botLine.flat(1), 0X00FFFF));

        // add to group
        terrain.add(terrainPoints);
        this.scene.add(this.camera);
        this.scene.add(terrain);

        this.scene.add(this.createLines([maxPoint.toArray(), minPoint.toArray()].flat(1), 0X00FF00));
        
        const unfilteredPoints = uIndexes.map<Array<number>>(i => this.points[i].toArray());
        this.scene.add(this.createPoints(unfilteredPoints.flat(1), 0xFFFFFF));

    }

    stepper(indexes:number[], hulls:number[], p0:number, p1:number):number[] {

        let p0Vec = this.points[p0].clone();
        let p1Vec = this.points[p1].clone(); 
        let points = indexes.map(i => this.points[i].clone());
        let maxDistanceIndex:number = this.findMaxDistancePoint(this.points[p0], this.points[p1], indexes);
        console.log('pre: ', maxDistanceIndex, hulls);
        if(indexes.length <= 0 || maxDistanceIndex<0) return [...hulls, p1];
        hulls = [...hulls];

        let aIndexes:number[] = [];
        let bIndexes:number[] = [];
        let cIndexes:number[] = [];
        let unwantedIndexes:number[] = [];
        console.log('pp', points, 'max ', maxDistanceIndex);

        for(let i of indexes) {
            console.log('i', i);
            const {u, v, w} = calBaryCentric(
                this.points[maxDistanceIndex].clone(),
                p1Vec,
                p0Vec,
                this.points[i].clone()
            );
                
            if(u<0) {
                aIndexes.push(i);
            } else if(v<0) {
                bIndexes.push(i);
            } else if(w<0) {
                cIndexes.push(i);
            } else {
                unwantedIndexes.push(i);
            }
    
        }

        const tmpHull:number[] = this.stepper(bIndexes, hulls, p0, maxDistanceIndex);
        return this.stepper(cIndexes, [...tmpHull], maxDistanceIndex, p1);
    }

    // stepper(hullPoints:number[], filteredIndexes:number[], unfilteredIndexes:number[]) {

    //     let maxDistanceIndex:number;
    //     const len:number = hullPoints.length
    //     const p0:number = hullPoints[len-2];
    //     const p1:number = hullPoints[len-1];
    //     let points = this.points.map(p => p.clone());

    //     while(unfilteredIndexes.length) {
    //         console.log('me run', unfilteredIndexes.length, p0, p1);
    //         debugger;
    //         maxDistanceIndex = this.findMaxDistancePoint(this.points[p0], this.points[p1], points);
    //         console.log('maxDistanceIndex', maxDistanceIndex);
    //         if(maxDistanceIndex < 0) break;

    //         hullPoints.push(maxDistanceIndex);

    //         for(let i=0; i<points.length; i++) {
    //             console.log('p index', maxDistanceIndex, p1, p0, i);
    //             console.log(maxDistanceIndex, points[maxDistanceIndex].toArray());
    //             console.log(p1, points[p1].toArray());
    //             console.log(p0, points[p0].toArray());
    //             console.log(i, points[i].toArray());
                
    //             const {u, v, w} = calBaryCentric(
    //                 points[maxDistanceIndex].clone(),
    //                 points[p1].clone(), 
    //                 points[p0].clone(),
    //                 points[i].clone()
    //             );
                
    //             if(u>=0 && v>=0 && w>=0) {
    //                 filteredIndexes.push(i); 
    //             }
    //         }
            
    //         unfilteredIndexes = unfilteredIndexes.filter(item => !filteredIndexes.includes(item));
    //         console.log('iterated', filteredIndexes, unfilteredIndexes);
    //         console.log('mama', p0, maxDistanceIndex);
    //         this.stepper(hullPoints, filteredIndexes, unfilteredIndexes);
    //         this.stepper(hullPoints, filteredIndexes, unfilteredIndexes);
    //     }
        
    //     return filteredIndexes;
 
    // }

    findMaxDistancePoint(pA:Vector3, pB:Vector3, indexes:number[]):number {
        let distance:Array<{index:number, value:number}> = [];
        for(let i of indexes) {
            distance.push({
                index: i,
                value: calOrthDistance(pA.clone(), pB.clone(), this.points[i].clone())
            });
        }
        console.log('dd', distance)
        const maxDistance = distance.reduce((prev:any, cur:any) => {
            prev = Math.max(prev.value, cur.value) === cur.value ? {...cur} : prev;
            return prev;
        }, {index: -1, value: 0});

        return maxDistance.index;
    }

    /**
     * create line to add to scene
     * @param vertices
     * @param color 
     */
    createLines(vertices:number[], color:string | number | Color):Object3D {
        const lineGeo = new BufferGeometry();
        lineGeo.setAttribute('position', new Float32BufferAttribute(vertices, 3));
        const lineMat = new LineBasicMaterial({ color });
        return new Line(lineGeo, lineMat);
    }

    /**
     * create points to add to scene
     * @param vertices
     * @param color 
     */
    createPoints(vertices:number[], color:string | number | Color):Object3D {
        const pointGeo = new BufferGeometry();
        pointGeo.setAttribute('position', new Float32BufferAttribute(vertices, 3));
        const pointMat = new PointsMaterial({ color });
        return new Points(pointGeo, pointMat);
    }

    indexArrGenerator(n:number):number[] {
        return Array.from({length: n}, (_, i) => i);
    }

}
