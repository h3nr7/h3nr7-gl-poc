export type ISize = [number,number]
export type IPosition = [number, number, number]
export type ICoord = [number, number]

export type IPoints =  IPosition[];

export enum ObjectName {
    Camera = 'CAMERA',
    Terrain = 'TERRAIN',
    Scene = 'SCENE'
}

export interface IGlCanvasProps {
    
}