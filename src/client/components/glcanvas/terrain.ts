import { WebGLRenderer, PerspectiveCamera, Group, Scene, Mesh, BoxGeometry, MeshBasicMaterial, MathUtils, BufferGeometry, Float32BufferAttribute, PointsMaterial, Points } from 'three';

import { ObjectName, ISize } from './glcanvas.interface';
import { render } from 'react-dom';
import { hot } from 'react-hot-loader';

export default class TerrainClass {

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

        const vertices = [];
        for ( let i=0; i<10000; i++) {
            let x = MathUtils.randFloatSpread(200);
            let y = MathUtils.randFloatSpread(200);
            let z = -400;

            vertices.push(x,y,z);
        }

        const pointGeo = new BufferGeometry();
        pointGeo.setAttribute('position', new Float32BufferAttribute(vertices, 3));
        const pointMat = new PointsMaterial({ color: 0xEEEEEE });
        const points = new Points(pointGeo, pointMat);
        scene.add(points);


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
