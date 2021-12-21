# Proyect Name:
RestaurantMe

## Description
RestaurantMe is an app where you can easily save and prioritize restaurants you want to visit. It’s your restaurant wishlist. When you don’t know where to eat tonight RestaurantMe will quickly help you find a good place.

## User Interactions
Log-in;
Log-out;
Sign-up;
Homepage: my restaurant list + nav bar: add restaurant, return home, search
Add a restaurant;
Edit restaurant;
Delete restaurant;

## Backlog
geoLocation/mapa;
favoritos;

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
