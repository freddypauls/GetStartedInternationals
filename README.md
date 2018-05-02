# GetStartedInternationals
Can be accessed [HERE](https://getstartedinternationals-1467c.firebaseapp.com/)

## Authors

* Henrik Reff Snilsberg
* Fredik Paulsen
* Mats Gundersen

## Background

NTNU-Gjøvik receives around 100 internationals students during the autumn semester, and
around 50 students during the spring semester. These numbers are actually increasing since
HiG joined NTNU. Most of those students are having accommodations in SIT’s apartment where
they don’t have any equipments for their rooms (apartments) and kitchens. That has forced the
students to buy all needed equipment when they arrive to Norway and throw/give it away when
they leave.

## The idea of the application

The idea is to create a mobile application that helps collecting these equipments from students
before leaving Norway and give it to the new students when they arrive. This will be done by
having a database that allow users to register the items they have before leaving. Also new students will use the application to browse for registered equipments and reserve it if they wanted
it.
The application will contains three types of users:
* Arrival student: Student who is coming and want to check out if there is any available
equipment that he/she may need.
* Leaving student: Student who is leaving at want to register his/her equipments into the
database.
* Admin: An admin that makes sure that register users (Arrival & Leaving students) and hold
status of the database to make sure that all registered data are right.

## The employer

This idea is presented to the International Office in NTNU Gjøvik, and they couldn’t offer the
effort of it. The student assistant coordinator for international students in NTNU-Gjøvik:
Ahmed S. M. Madhun is offering this project for mobile development course students.

## Built With

* [Firebase](https://firebase.google.com/) - The serverside/database
* [MaterializeCSS](http://materializecss.com/) - A modern responsive front-end framework based on Material Design 
* [JQuery-UI](https://jqueryui.com/) - Mainly used JQuery which is a JavaScript Library
* JavaScript
* HTML5
* CSS3

## How code is organized
Root - Has all the firebase files, pluss a folder(Public) where all web-files are located
- Public - Contains all the html files and other folders
  - css - contains all the cascading style sheet files 
  - js - contains all the javascript files
  - images - contains all the images used for items
  - jquery-ui - contains all the jquery-ui files aswell as jquery
    
## Logins and serverside
To access the admin account use:
Email: getstartedinternationals@gmail.com
Password: admingsi123

To access the firebase backend/console use:
Email: getstartedinternationals@gmail.com
Password: thiscanbechangedlater
    
## Installation instructions
Clone the repository to a folder of your choice

Download firebase CLI LINK HERE

Use cmd and navigate to the folder and run the command to run the server locally
```
firebase serve
```
or this command to upload to the firebase server
```
firebase deploy
```
which can be accessed at this [LINK](https://getstartedinternationals-1467c.firebaseapp.com/) 
