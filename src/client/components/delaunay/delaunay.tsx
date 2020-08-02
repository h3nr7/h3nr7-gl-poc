import BaseGlContainer from "../glcanvas/glcontainer.base";
import { Object3D, Color, BufferGeometry, Float32BufferAttribute, PointsMaterial, Points, Vector3, MathUtils, MeshBasicMaterial, Mesh, ShaderMaterial, AdditiveBlending, PerspectiveCamera, Scene } from "three";
import vs from './shader.vert';
import fs from './shader.frag';
import { IDelaunay } from "./delaunay.interface";

export class Delaunay extends BaseGlContainer implements IDelaunay {

    // added class variable
    verticalHeight:number

    constructor(canvas:HTMLCanvasElement, datum:any) {
        super(canvas, null, true);

        // set camera pos
        this.camera.position.z = 600;
        this.camera.lookAt( 0, 0, 0 );
        this.scene.add(this.camera);
        this.count = 0;

        datum.forEach((data:any, index:number) => {
            const { vertices, colors } = this._createVC(index, datum.length, data);
            this.scene.add(this._createPoints(vertices, colors));
        });
    }

    _createVC(index:number, datumLen:number, data:any):{ vertices:Vector3[], colors:Color[] } {
        const { 
            elevations, width, height, imgWidth,
            imgHeight, min, max } = data;
        const scale = Math.round(imgWidth / width);
        const minX = -width/2;
        const maxX = width/2;
        const minY = -height/2;
        const maxY = height/2;

        let vertices:Vector3[] = [];
        let colors:Color[] = [];
        for ( let i=0; i<elevations.length; i++) {
            const x = MathUtils.randInt(minX, maxX);
            const y = MathUtils.randInt(minY, maxY);
            const z = elevations[(width/2 + x) + (height/2 + y) * height];
            let pos:Vector3 = new Vector3(
                (width*((1-datumLen)/2 + index) + x) * scale, 
                -y * scale, 
                z * 1
            );

            let color:Color = new Color();
            color.setScalar(MathUtils.mapLinear(z, min, max, 0, 1))
            vertices.push(pos);
            colors.push(color);
        } 
        console.log(minX, maxX, minY, maxY);
        return {vertices, colors};
    }

    _createPoints(vertices:Vector3[], colors:Color[]):Object3D {
        const pointGeo = new BufferGeometry();
        pointGeo.setAttribute('position', new Float32BufferAttribute(vertices.map(v => v.toArray()).flat(1), 3));
        pointGeo.setAttribute('color', new Float32BufferAttribute(colors.map(c => c.toArray()).flat(1), 3));
        
        const pointMat = new ShaderMaterial({
            vertexShader: vs,
            fragmentShader: fs,
            // blending: AdditiveBlending,
            depthTest: false,
            transparent: true,
            vertexColors: true
        });
        return new Points(pointGeo, pointMat);
    }

    animate() {
        this.verticalHeight = Math.sin(this.count);
    }



}