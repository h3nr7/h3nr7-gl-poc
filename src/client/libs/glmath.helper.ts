import { IMinMaxPoint, IBaryCentric, AxisNum } from '../components/glcanvas/glcanvas.interface'
import { Vector3 } from 'three';


/**
 * calculate baricentric coordi
 */
export const calBaryCentric = (a:Vector3, b:Vector3, c:Vector3, p:Vector3):IBaryCentric => {
    let v0:Vector3 = b.sub(a);
    let v1:Vector3 = c.sub(a);
    let v2:Vector3 = p.sub(a);

    let d00:number = v0.dot(v0);
    let d01:number = v0.dot(v1);
    let d11:number = v1.dot(v1);
    let d20:number = v2.dot(v0);
    let d21:number = v2.dot(v1);
    let denom = d00 * d11 - d01 * d01;
    let v = (d11 * d20 - d01 * d21) / denom;
    let w = (d00 * d21 - d01 * d20) / denom;
    let u = 1 - v - w;
    return {u, v, w};
}

/**
 * Line [ax + by + c = 0]
 * Point [0, y0]
 * distance(ax + by + c = 0, (x0, y0)) = |a*x0 + b*y0 + c| / (a^2 + b^2)^1/2
 * therefore,
 * a = y2 - y1
 * b = x2 - x1
 * c = x2 * y1 - y2 * x1
 */
export const calOrthDistance = (p1:Vector3, p2:Vector3, p0:Vector3):number => {

    const a = p2.y - p1.y;
    const b = p2.x - p1.x;
    const c = p2.x*p1.y - p2.y * p1.x;

    return (a*p0.x - b*p0.y + c) / Math.sqrt(a*a + b*b);
}

/**
 * 
 * @param indexes 
 * @param arr 
 */
export const removePointsByIndexes = (indexes:number[], arr:Vector3[]):Vector3[] =>  {
    const newArr:Vector3[] = [...arr];
    indexes.sort();
    console.log(indexes);
    // very elegant solution to splice with indexes sort
    while(indexes.length) {
        newArr.splice(indexes.pop(), 1);
    }
    return newArr;
}

/**
 * Find the min and max point along the given axis, default to x
 * @param allPoints
 * @param removeMinMaxPoints 
 */
export const findMinMaxPoint = (
    allPoints:Vector3[], 
    axisNum:AxisNum = AxisNum.x // x, y, z to
):IMinMaxPoint => {
    let minIndex:number = -1;
    let maxIndex:number = -1;
    let minPoint:Vector3 = new Vector3(Infinity, Infinity, Infinity);
    let maxPoint:Vector3 = new Vector3(-Infinity, -Infinity, -Infinity);

    for(let j=0; j<allPoints.length; j++) {

        if(allPoints[j][axisNum] <= minPoint[axisNum]) {
            minIndex = j;
            minPoint.copy(allPoints[j]);
        }

        if(allPoints[j][axisNum] >= maxPoint[axisNum]) {
            maxIndex = j;
            maxPoint.copy(allPoints[j]);
        }    
    }  

    return {minPoint, maxPoint, minIndex, maxIndex};
}

