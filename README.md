# H3NR7-GL-POC 

Proof of concept using Typescript, react and ThreeJS.  

The main purpose is to create a mesh that can be altered using height map.

### Topology map of the world from Nasa
* [Nasa Earth Data](https://earthdata.nasa.gov/learn/articles/nasa-shuttle-radar-topography-mission-srtm-version-3-0-global-1-arc-second-data-released-over-asia-and-australia)
* [Simpler GUI to extract SRTM height map](https://dwtkns.com/srtm30m/)
* [Nasa Shuttle Radar Topography Mission (SRTM)](https://www2.jpl.nasa.gov/srtm/dataprod.htm)
* [SRTM 90m data](http://srtm.csi.cgiar.org/)


### GPS Visualizer
[GPS Visualizer](https://www.gpsvisualizer.com/) is also a very important and useful site to check GPS data and will be important.

### Algorithm to build the triangles

Delaunay is probably best describe what I am trying to achieve.  Which ironically was the starting point of Baterial 1.0 fo monkiki, a project I started and abbandoned 6 years ago.

There are several methods to create delaunay however to restart my approach I need to get myself familiar with the "basics" again and there is better then start building a solution for convex hull using the quick hull approach.

There are also several other approaches and they are described here:

[Wiki Convex hull](https://en.wikipedia.org/wiki/Convex_hull_algorithms)

### Q-Hull

[Wiki on Quick hull](https://en.wikipedia.org/wiki/Quickhull)

### S-Hull

There is a very good website dedicated to this.

[http://www.s-hull.org/](http://www.s-hull.org/)

And also a fast radial routine approach [Cambridge paper in 2010](http://www.s-hull.org/paper/s_hull.pdf) about it



