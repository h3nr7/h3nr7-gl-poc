import { IPosition } from './glcanvas.interface'

/**
 * Line [ax + by + c = 0]
 * Point [0, y0]
 * distance(ax + by + c = 0, (x0, y0)) = |a*x0 + b*y0 + c| / (a^2 + b^2)^1/2
 * therefore,
 * a = y2 - y1
 * b = x2 - x1
 * c = x2 * y1 - y2 * x1
 */
export const calOrthDistance = (p1:IPosition, p2:IPosition, p0:IPosition):number => {

    const a = p2[1] - p1[1];
    const b = p2[0] - p1[0];
    const c = p2[0]*p1[1] - p2[1] * p1[0];

    return Math.abs(a*p0[0] - b*p0[1] + c) / Math.sqrt(a*a + b*b);
}