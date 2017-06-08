# SF Crime Map

Geographic data visualization and analytics for San Francisco crime. In its current iteration, the project fetches and maps the 6,000 most recently reported violent crimes in San Francisco. This is an ongoing project, with the current live version [here](https://djfletcher.github.io/SFDataViz/).

## Features in Development:
+ Filter by crime type.
+ Click individual crime spots for details about that crime.
+ Creation of a Node/Express backend to handle the point-in-polygon logic that currently slows down the browser and disrupts UX.
+ Address search, including autocomplete.
+ Access user's geolocation and plot it on map.
+ Logic to find and visually emphasize "safe spots" of low density crime, and "hot spots" of high density crime.
