import BaseGlContainer from "../glcanvas/glcontainer.base"
import { 
    WebGLRenderer, Vector3, MathUtils, BufferGeometry, Float32BufferAttribute,
    Object3D, PointsMaterial, Points, Line, LineBasicMaterial, Color
} from 'three';
import { calOrthDistance, calBaryCentric, findMinMaxPoint } from '../../libs/glmath.helper';

export default class Polyhedra extends BaseGlContainer {

    totPoints:number = 300;
    points:Vector3[] = [];

    constructor(canvas:HTMLCanvasElement, hasOrbitControl:boolean = true) {
        super(canvas, null, hasOrbitControl);

        this._init();
    }

    _init() {

    }

}