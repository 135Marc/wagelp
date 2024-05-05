# wagelp - Salary Calculations Simplified

**NOTE - THIS APPLICATION'S METHOD OF CALCULATION IS OUT-DATED!** - The Government of Portugal has changed the method of calculating, and applying, the Income Tax. This change was made in July of 2023.
I did not update this application, mainly because I lost interest in it, but who knows, maybe one day I'll go back to it? Not likely though, I've learned what I wanted to learn with this project anyway.

WebApp to simplify after-taxes salary calculations. Only applies to salaried employees in Portugal, as of now. 

It's stack is as follows: **Python (Parser), SQLite (Database), NodeJS (Middleware) and React-Typescript (FrontEnd).**

Main goal of this project was to make something I would actually use, I found out that the tools available for net salary calculations in Portugal were lackluster, so I set out to build my own.
I also wanted to learn more about React and Node, so it was the perfect "excuse" to integrate them together in a project that was appealing to me.

The workflow for this project is as follows:

1. Parser reads Excel files, converts them into objects, stores those objects in a Map, iterates over it and then inserts each object into the SQLite Database;
2. Middleware is connected to the Database, responds to requests, following RESTful patterns, so that the Front-End can consume and render the data;
3. Front-End consumes data coming from the Middleware and renders it accordingly.

## Parser

For more detailed information, read the **README.md** file present in the *parser* folder.

## Database

The tax data is stored in a SQLite Database File, with the following ER Diagram:

## Middleware

It's main function is to serve as an API so that the Front-End can call the target endpoints to render the necessary data. 
More information can be found on the **README.md** file, present in the *middleware* folder.

## Front-End

The UI is made using *React-Typescript, Redux-Toolkit for State Management, React-Query for handling data and React-Bootstrap* which enabled me to write the UI with the help of *Boostrap Framework*.
In the *frontend* folder, there's a **README** file with more details.
