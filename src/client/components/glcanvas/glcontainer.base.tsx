import { WebGLRenderer, PerspectiveCamera, Group, Scene, Mesh, BoxGeometry, MeshBasicMaterial, MathUtils, BufferGeometry, Float32BufferAttribute, PointsMaterial, Points, LineBasicMaterial, Line, Camera, Renderer, Object3D } from 'three';
import { ObjectName, ISize, IPosition } from './glcanvas.interface';

/**
 * Base Interface for Gl Containers
 */
export interface IBaseGlContainer {
    camera:PerspectiveCamera;
    scene:Scene;
    renderer:WebGLRenderer;
    animationFrameId:number;

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

    constructor(canvas:HTMLCanvasElement, renderer?:WebGLRenderer) {
        // initialise renderer
        renderer = renderer || new WebGLRenderer({
            alpha: false,
            antialias: true,
            canvas
        });

        const camera = new PerspectiveCamera();
        const scene = new Scene();

        // name object
        camera.name = ObjectName.Camera;
        scene.name = ObjectName.Scene;

        // assign values to class vars
        this.camera = camera;
        this.scene = scene;
        this.renderer = renderer;
    }

    // add 3d objects to scene
    addToScene(objs:Object3D[]) {
        for(let o of objs) {
            this.scene.add(o);
        }
    }

    // animate
    animate(): void {
        this.render();
        this.animationFrameId = requestAnimationFrame(this.animate.bind(this));
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