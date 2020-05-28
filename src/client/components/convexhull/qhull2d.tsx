import BaseGlContainer from "../glcanvas/glcontainer.base"
import { 
    WebGLRenderer, Vector3, MathUtils, BufferGeometry, Float32BufferAttribute,
    Object3D, PointsMaterial, Points, Line, LineBasicMaterial, Color
} from 'three';
import { calOrthDistance, calBaryCentric, findMinMaxPoint } from '../../libs/glmath.helper';

export default class QHull2D extends BaseGlContainer {

    totPoints:number = 300;
    points:Vector3[] = [];

    constructor(canvas:HTMLCanvasElement, hasOrbitControl:boolean = true) {
        super(canvas, null, hasOrbitControl);

        this._init();
    }

    _init() {
        // set camera pos
        this.camera.position.z = 200;
        this.camera.lookAt( 0, 0, 0 );

        this._createRandomPoints();

        let uIndexes:number[] = this.indexArrGenerator(this.points.length);

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

        const topOutput = this.stepper(topIndexes, [maxIndex], maxIndex, minIndex);
        const topLine = topOutput.map(item => this.points[item].toArray());

        const botOutput = this.stepper(botIndexes, [minIndex], minIndex, maxIndex);
        const botLine = botOutput.map(item => this.points[item].toArray());

        this.scene.add(this._createLines(topLine.flat(1), 0XFFFF00));
        this.scene.add(this._createLines(botLine.flat(1), 0X00FFFF));

        // this.scene.add(this.createLines([maxPoint.toArray(), minPoint.toArray()].flat(1), 0X00FF00));

        this.scene.add(this.camera);

        const unfilteredPoints = uIndexes.map<Array<number>>(i => this.points[i].toArray());
        this.scene.add(this._createPoints(unfilteredPoints.flat(1), 0xFFFFFF));
    }

    stepper(indexes:number[], hulls:number[], p0:number, p1:number):number[] {

        let p0Vec = this.points[p0].clone();
        let p1Vec = this.points[p1].clone(); 
        let points = indexes.map(i => this.points[i].clone());
        let maxDistanceIndex:number = this.findMaxDistancePoint(this.points[p0], this.points[p1], indexes);

        if(indexes.length <= 0 || maxDistanceIndex<0) return [...hulls, p1];
        hulls = [...hulls];

        let aIndexes:number[] = [];
        let bIndexes:number[] = [];
        let cIndexes:number[] = [];
        let unwantedIndexes:number[] = [];
        console.log('pp', points, 'max ', maxDistanceIndex);

        for(let i of indexes) {
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

    findMaxDistancePoint(pA:Vector3, pB:Vector3, indexes:number[]):number {
        let distance:Array<{index:number, value:number}> = [];
        for(let i of indexes) {
            distance.push({
                index: i,
                value: calOrthDistance(pA.clone(), pB.clone(), this.points[i].clone())
            });
        }

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
    _createLines(vertices:number[], color:string | number | Color):Object3D {
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
    _createPoints(vertices:number[], color:string | number | Color):Object3D {
        const pointGeo = new BufferGeometry();
        pointGeo.setAttribute('position', new Float32BufferAttribute(vertices, 3));
        const pointMat = new PointsMaterial({ color });
        return new Points(pointGeo, pointMat);
    }

    _createRandomPoints() {
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
    }

    indexArrGenerator(n:number):number[] {
        return Array.from({length: n}, (_, i) => i);
    }


}