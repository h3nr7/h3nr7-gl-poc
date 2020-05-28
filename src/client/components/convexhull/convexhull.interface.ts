import { Vector3 } from 'three';

export enum OPTIONS {
    qhull2d='qhull2d',
    jarvismarch ='javismarch'
}

export type ISize = [number,number]
export type ICoord = [number, number]

export type IPoints =  Vector3[];

export enum AxisNum {
    x='x',
    y='y',
    z='z'
}

export enum ObjectName {
    Camera = 'CAMERA',
    Terrain = 'TERRAIN',
    Scene = 'SCENE'
}

export interface IMinMaxPoint {
    minPoint: Vector3;
    maxPoint: Vector3;
    minIndex:number;
    maxIndex:number;
}

export interface IBaryCentric {
    u: number,
    v: number,
    w: number
}

export interface IConvexhullProps {
    renderOption: string,
    reload: number
}