# SF Crime Map

Geographic data visualization and analytics for San Francisco crime. In its current iteration, the project fetches and maps the 6,000 most recently reported violent crimes in San Francisco. This is an ongoing project, with the current live version [here](https://djfletcher.github.io/SFDataViz/).

## Features in Development:
+ Safe path finding -- map walking routes from point A to point B and return a collection of the safest routes, according to density of crime incidents along each route.
+ Filter by crime type.
+ Click individual crime spots for details about that crime.
+ Creation of a Node/Express backend to handle the point-in-polygon logic that currently slows down the browser and disrupts UX.
+ Address search, including autocomplete.
+ Access user's geolocation and plot it on map.
+ Logic to find and visually emphasize "safe spots" of low density crime, and "hot spots" of high density crime.

## Libraries:
+ [Turf.js](http://turfjs.org/docs/):
  + #lineOffset - Takes a line and returns a line at offset by the specified distance.
  + #lineStringToPolygon - Converts (Multi)LineString(s) to Polygon(s). (could be used in conjunction with the above)
  + #lineIntersect - Takes any LineString or Polygon GeoJSON and returns the intersecting point(s).
  + #lineSlice - Takes a line, a start Point, and a stop point and returns a subsection of the line in-between those points. The start & stop points don't need to fall exactly on the line.
  + #pointOnLine - Takes a Point and a LineString and calculates the closest Point on the (Multi)LineString.
  + #booleanPointOnLine - Returns true if a point is on a line. Accepts a optional parameter to ignore the start and end vertices of the linestring.
+ [OSMnx](http://geoffboeing.com/2016/11/osmnx-python-street-networks/):
  + OSMnx is a Python package for downloading administrative boundary shapes and street networks from OpenStreetMap. It allows you to easily construct, project, visualize, and analyze complex street networks in Python with NetworkX. You can get a city’s or neighborhood’s walking, driving, or biking network with a single line of Python code. Then you can simply visualize cul-de-sacs or one-way streets, plot shortest-path routes, or calculate stats like intersection density, average node connectivity, or betweenness centrality.
  + [Github](https://github.com/gboeing/osmnx)
  + [Documentation](https://osmnx.readthedocs.io/en/stable/osmnx.html#)
+ [Networkx](https://networkx.github.io/):
  + NetworkX is a Python package for the creation, manipulation, and study of the structure, dynamics, and functions of complex networks.
+ [Geopandas](http://geopandas.org/):
  + The goal of GeoPandas is to make working with geospatial data in python easier.  GeoPandas enables you to easily do operations in python that would otherwise require a spatial database such as PostGIS.
