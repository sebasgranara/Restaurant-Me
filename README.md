# Proyect Name:
RestaurantMe

## Description
RestaurantMe is an app where you can easily save and prioritize restaurants you want to visit. It’s your restaurant wishlist. When you don’t know where to eat tonight RestaurantMe will quickly help you find a good place.

## User Interactions
***sign-up*** as a user I want to be able to sign up for the app quickly without complications and without providing too much data 
***log-in*** as a user I want to be able to log into the app so I can view and process my restaurants
***log-out*** as a user I want to be able to log out from the app once I'm done using it so that nobody can see my account
***homepage*** as a user I want to see my restaurant list right after I log in and be able to access their details or update them quickly
***add a restaurant*** as a user I want to be able to create a restaurant quickly without enter too much data at first
***find a restaurant*** as a user I want to be able to find a restaurant that meets my criteria
***edit a restaurant*** as a user I want to be able to update previously added restaurants once I have more info about them or just more time 
***delete a restaurant*** as a user I want to be able to delete a restaurant I'm no longer interested in

## Backlog
***map*** as a user I want to see where my restaurants are
***favorites*** as a user I want to be able to add a restaurant to my favorites and remove it from it

## Models
Restaurant model
```
{
    name: {type: String, required: true}
    img: {type: String, default: 'images/default-avatar.png'}
    budget: type: String (rango de precio) [array cerrado con dropdown]
    priority: String (mayor descripcion) [array cerrado con dropdown]
    openHours: Objetc (key dia: horario) 
    veganMenu: String (si/no),
    glutenFree: String (si/no),
    address: Objetc {address,CP, city, etc, barrio}
    neighborhood:
    geoLocation/coordenadas: Object {latitud long
    cuisine: String, 
    ambiente: String, 
    notas: String, 
    booking: String (url)
    menu: String (url)
}
```
User model
```
{
    name: String,
    email: String,
    hashedPassword: String,
    age: Number,
    city: String,
}
```
## Routes
​
| Name            | Method | Endpoint                      | Description                                            | Body                | Redirects       |
| --------------- | ------ | ----------------------------- | ------------------------------------------------       |-------------------- | --------------- |
| Home            | GET    | /                             | See the main page                                      |                      |                 |
| Log in form     | GET    | /login                        | See the form to log in                                 |                      |                 |
| Log in          | POST   | /login                        | Log in the user                                        | {mail, password}     | /               |
| Sign Up form    | GET    | /signup                       | See the form to sign up                                |                      |                 |
| Sign Up         | POST   | /signup                       | Sign up a user                                         |  {mail, password}    | /profile        |
| Log out         | GET    | /logout                       | Log out a user                                         |                      | /               |
| Home/ delete    | GET    | /restaurants                  | See user's restaurant collection                       |                      |                 |
| Restaurant      | GET    | /:restaurantid                | Read restaurant's information                          |                      |                 |
| Search form     | GET    |                               |                                                        |                      |
| Search          | POST   |                               |                                                        |                      |
| Rest. add form  | GET    | /restaurants/new              | See form to upload a new restaurant                    |                      |                 |
| Rest. add       | POST   | /restaurants/new              | Upload a restaurant to user's collection               |              /restaurants/restaurantid |
| Rest. edit form | GET    | /restaurants/:restaurantid/edit| See edit form with restaurant's preloaded information  |                     |                 |
| Rest. edit      | POST   | /restaurants/:restaurantid/edit| Add restaurant's new information                |              /restaurants/restaurantid  
| Rest. delete    | POST   | /restaurants/:restaurantid/delete | Delete restaurants from user's collection    |                      | /restaurants  

