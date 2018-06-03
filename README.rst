## SVO Slider Kit
A set of tools for easily and scalably implementing the [Social Value Orientation Slider Measure](http://ryanomurphy.com/resources/Murphy-Ackermann-Handgraaf-2011.pdf). 

### Features
1. An easy to deploy web application implementing the social value orientation slider and optional, configurable pre-survey
2. Jupyter notebooks for extracting data from the remote datastore and analyzing the data
3. A python library for computing SVO angles and other measures from the raw data

### The Web Application
The primary feature of the SVO Slider Kit is the web application implementing the pre-survey and SVO Slider Measure. It's (currently) a [Next.js](https://zeit.co/blog/next) application using PouchDB and [Firebase](https://firebase.google.com/) for persistance. This means it's very easy to deploy and extract data from. The application also uses [SurveyJS](https://surveyjs.io/Overview/Library/), so users only have to configure a javascript object to create a wide range of pre-surveys. In
addition to bundling the surveys, the application tracks a number of user-generated events, providing rich meta-data about the survey process. All of this information is bundled and stored in a single comprehensive json-like for each session and stored in Firebase.  

### Notebooks - [NOT YET IMPLEMENTED]
The kit also provides a set of [Jupyter notebooks](https://jupyter.org/) for accessing the data from Firebase and pre-processing for easier use in analysis.    

### Python Library - [NOT YET IMPLEMENTED]
A small python library for scoring the SVO Slider Measure is also included.
