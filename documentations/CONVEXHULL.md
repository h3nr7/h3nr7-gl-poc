# Convex Hull

### Barycentric Coordinates system

In order to understand Barycentric Coordinates and how to create a function which determines the relative coordinates, the understanding of the Ceva Theorem would be very helpful.

![Ceva Theorem](https://images.ctfassets.net/wjpxigc6xst0/30tqjgC1g49zIkYoU7bDS/aa91d34343ade7f473bdf2493ba5c136/CevasTheorem_1000.jpg)

*P = uA &middot; vB &middot; wC*

where A, B, C are the vertices of the triangle and u, v, w are barycentric coordinates of scalar such that:

*u + v + w = 1*

Barycentric coordinates are normalised, this relationship is useful determining if a point P is lying within the triangle as well as the associated distance from the 3 vertices.

Therefore using this relationship, the following function can be used to calculate the barycentric coordinates u, v, w.

```
function calBaryCentric(a:Vector3, b:Vector3, c:Vector3, p:Vector3):IBaryCentric {
    let v0 = b.sub(a);
    let v1 = c.sub(a);
    let v2 = p.sub(a);
    let d00 = v0.dot(v0);
    let d01 = v0.dot(v1);
    let d11 = v1.dot(v1);
    let d20 = v2.dot(v0);
    let d21 = v2.dot(v1);
    let denom = d00 * d11 - d01 * d01;
    let v = (d11 * d20 - d01 * d21) / denom;
    let w = (d00 * d21 - d01 * d20) / denom;
    let u = 1 - v - w;
    return {u, v, w};
}
```