# Convex Hull


### Barycentric Coordinates system

In order to understand Barycentric Coordinates and how to create a function which determines the relative coordinates, the understanding of the Ceva Theorem would be very helpful.

![Ceva Theorem](https://images.ctfassets.net/wjpxigc6xst0/2KcUkanr77GFVtGzMSfQQH/6cee9920c8aa56a9b9a2721ec60ebdcf/CevasTheorem_1000.jpg)

The relationship is straight forward.

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


### Quickhull

By dividing initially along the x-axis, similar to the divide and conquer approach.  I am able to achieve this in 2D by finding the top and bottom furthest point and split into 2 groups.  The next step is to form a triangles with the furthest point from the line.  Using the barycentric coordinates and the property of ```u, v, w``` and it's relationship with the vertices ```A, B, C, P```.  We can determine the relative positioning of other points by examining if ```u, v, w``` is greater than or less than 0.  We can then feed this back resursively until there are no points left, hence a convex hull is formed.

![Quickhull 2D](https://images.ctfassets.net/wjpxigc6xst0/4UH9QYRjHbtsWMEV6rDH7i/97321f54f58f820d6ac2b1e8c83099b6/Annotation_2020-05-26_084406.jpg)

Using the Pseudo code from wikipedia as a guide.

```pseudocode
Input = a set S of n points 
Assume that there are at least 2 points in the input set S of points

function QuickHull(S) is
    // Find convex hull from the set S of n points
    Convex Hull := {} 
    Find left and right most points, say A & B, and add A & B to convex hull 
    Segment AB divides the remaining (n − 2) points into 2 groups S1 and S2 
        where S1 are points in S that are on the right side of the oriented line 
        from A to B, and S2 are points in S that are on the right side of the 
        oriented line from B to A 
    FindHull(S1, A, B) 
    FindHull(S2, B, A) 
    Output := Convex Hull
end function

```

```pseudocode
Input = a set Sk of n points

function FindHull(Sk, P, Q) is
    // Find points on convex hull from the set Sk of points 
    // that are on the right side of the oriented line 
    // from P to Q
    if Sk has no point then
        return
    From the given set of points in Sk, find farthest point, 
        say C, from segment PQ 
    Add point C to convex hull at the location between P and Q 
    Three points P, Q, and C partition the remaining points of 
        Sk into 3 subsets: S0, S1, and S2 
        where S0 are points inside triangle PCQ, S1 are points 
        on the right side of the oriented line from P to C, and 
        S2 are points on the right side of the oriented line 
        from C to Q. 
    FindHull(S1, P, C) 
    FindHull(S2, C, Q) 
end function
```

There are faster method in determining the Convex Hull, for example the [Fast sweep Hull method SHull](http://s-hull.org/) forms the delaunay that will also be revisited further...


The next step is pretty obvious... pushing it into 3D.  However it is a little more tricky as seen below.

![3D Convex Hull Issue](https://images.ctfassets.net/wjpxigc6xst0/6F10X6SOggru9Mu6dLFL9t/a9183a21f6556c741aa5378bc73f19a4/example_2d_hull_issue.gif)

###### REFERENCES

* [Wiki on Convex hull](https://en.wikipedia.org/wiki/Quickhull)
* [QHull dedicated website](http://www.qhull.org/)
* [Convex hull Algorithm](https://en.wikipedia.org/wiki/Convex_hull_algorithms)
* [SHull dedicated website](http://s-hull.org/)
* [A 3D Sweep Hull Algorithm for computing Convex Hulls and
Delaunay Triangulation - Dr David. A. Sinclair 2016](https://arxiv.org/ftp/arxiv/papers/1602/1602.04707.pdf)
