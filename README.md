# Homely Tavern

Personnaly project (November 2018 to present)

## Useful links:
* [Summary](#Summary)
* [Project Description](#project-description)
* [Project Demo](#project-demo)
* [Running the Project](#running-the-project)

## Summary 
	
Homely Tavern is at its core a bar application that is simplified for the home bartender. The home bartender can user this application to organize his personal stock within a list of different ingredient lists, each of which is displayed as a table of information. The application also allows the user to create personalized recipes for drinks and organize these into seasonal menus.

## Project Description
	
### Motivation

The idea for this project came from my own love of bartending and recipe crafting. I wanted an easy and personalized way to be able manage my own ingredients (alcoholic or not) and to be able to price them so that I could have a better grasp of the price of the drinks I was making (so I could of course share with my friends without going broke). As I was also in the midst of leaning web technologies, I decided to take this opportunity as way to further my knowledge of the technologies such as REACTJs.

### Technologies Used

The application uses REACT for the design of a system of components in the fron-end. 
This application also uses a NodeJs API for user data management. The API was created using express and the chosen database is MongoDb.
API testing and documentation were created using a Postman developement environemnt. Unit tests in the front and backend are completed using Jest.
This project also uses JSDocs and @ts-check for pseudo type checking in all files.

### Primary Uses

This application currently has two primary use cases. 

The first is the creation a manipulation of Ingredient Lists. Essentially, each User has access to a plethora of self created Ingredients List, each of which displaying packets of information about every ingredient in the form of a table. Every user has two types of lists: "Main" and "others". The main list contains all created ingredients and is used as a reference for ingredient suggestions in other sections of the application. The other lists are subsets of the main for that fit a condition (usually represented in the title) chosen by the user.

The second is the creation of recipes and manipulation of recipe books. A user can create recipes (by choosing ingredients from the main and quantities for that ingredient) and put those recipes into Menus. The backend does analysis on those recipes (such as pricing, abv measuring) and adds this information to the recipe.

## Project Demo

[](/readme-images/home.png?raw=true)

[](/readme-images/inventory.png?raw=true)

[](/readme-images/menu.png?raw=true)

## Running the Project

- Clone the project by running `git clone https://github.com/AsFal/bar` in a local repository
- Go to the back-end folder and run `npm install`
- Run `npm start` to then start the bar API locally
- Go to the front-end folder and run `npm install`
- `npm start` to then start the web application locally

## Semantical Definitions
- An Ingredient List is a list of ingredients displayed as a table of ingredients
- An Recipe is a document is a list of information that can be used to create a drink (essentially a drink is a single portion of a recipe). The work recipe is used unanimously in the code as to avoid confusion
- A menu is a collection of recipes
- The Recipe book is the name of the list of ALLRECPES

## TODOList
-[ ] Have a user page from which he has different options (that need to be implemented)
-[ ] A create ingredient view (that adds a recipe into the main collection)
-[ ] A view all recipes view
-[ ] Manage menus view
-[ ] A shopping cart view (connect with SAQ that could be cool)


