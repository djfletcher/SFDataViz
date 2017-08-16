# Road Network API

This project is built atop my [Road Network API](https://github.com/djfletcher/RoadNetworkAPI). If you haven't checked out that API, I recommend you read all about it.

# SF Crime Map

This project is geographic data visualization and analytics for San Francisco crime. In it's current iteration, the project fetches and maps the 6,000 most recently reported violent crimes in San Francisco. This is an ongoing project, with the current live version [here](https://djfletcher.github.io/SFDataViz/). **(hint: you need WebGL enabled to see the map)**

## Features in Development:
+ Safe path finding -- map walking routes from point A to point B and return a collection of the safest routes, according to density of crime incidents along each route.
+ Filter by crime type.
+ Click individual crime spots for details about that crime.
+ Creation of a Node/Express backend to handle the point-in-polygon logic that currently slows down the browser and disrupts UX.
+ Address search, including autocomplete.
+ Access user's geolocation and plot it on map.
+ Logic to find and visually emphasize "safe spots" of low density crime, and "hot spots" of high density crime.
