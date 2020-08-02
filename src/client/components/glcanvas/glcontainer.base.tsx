import { WebGLRenderer, PerspectiveCamera, Group, 
    Scene, Mesh, BoxGeometry, MeshBasicMaterial,
     MathUtils, BufferGeometry, Float32BufferAttribute, 
     PointsMaterial, Points, LineBasicMaterial, Line, Camera, Renderer, Object3D } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { ObjectName, ISize } from './glcanvas.interface';

/**
 * Base Interface for Gl Containers
 */
export interface IBaseGlContainer {
    camera:PerspectiveCamera;
    scene:Scene;
    renderer:WebGLRenderer;
    animationFrameId:number;
    hasOrbitControl:boolean;
    count:number;

    updateSize: (size?:ISize) => void;
    animate: () => void;
    render: () => void;
    destroy: () => void;
}

/**
 * Base Class for Gl Containers
 */
export default class BaseGlContainer implements IBaseGlContainer {

    camera:PerspectiveCamera;
    scene:Scene;
    renderer:WebGLRenderer;
    animationFrameId: number;
    hasOrbitControl: boolean;
    controls:OrbitControls;
    count:number;

    constructor(canvas:HTMLCanvasElement, renderer?:WebGLRenderer, hasOrbitControl?:boolean) {
        // initialise renderer
        renderer = renderer || new WebGLRenderer({
            alpha: false,
            antialias: true,
            canvas
        });

        const camera = new PerspectiveCamera(50, 1, 0.1, 3200);
        const scene = new Scene();
        if(hasOrbitControl) {
            const control = new OrbitControls( camera, renderer.domElement );
            this.controls = control;
        }

        // name object
        camera.name = ObjectName.Camera;
        scene.name = ObjectName.Scene;

        // assign values to class vars
        this.camera = camera;
        this.scene = scene;
        this.renderer = renderer;
        this.count = 0;

    }

    // add 3d objects to scene
    addToScene(objs:Object3D[]) {
        for(let o of objs) {
            this.scene.add(o);
        }
    }

    // animate
    animate(): void {
        this.count++;
        this.render();
        this.animationFrameId = requestAnimationFrame(this.animate.bind(this));
        if(this.hasOrbitControl) this.controls.update();
    }

    // render
    render(): void {
        this.renderer.render(this.scene, this.camera);
    }

    // update size of container
    updateSize(size?: ISize): void {
        if(size) {
            const [width, height] = size;
            this.renderer.setSize(width, height);
            this.camera.aspect = width/height;
        }

        this.camera.updateProjectionMatrix();
    }

    // destroy and clean up
    destroy():void {
        cancelAnimationFrame(this.animationFrameId);
    }
}