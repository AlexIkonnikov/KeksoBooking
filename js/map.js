'use strict';

let WIDTH_POOL = document.querySelector('.map__pins').offsetWidth;
let x, y;

function generatRandomValue (min, max) {

    let randNum = min + Math.random() * (max - min + 1);
    return Math.floor(randNum);

}

let titles = [
    "Большая уютная квартира",
    "Маленькая неуютная квартира",
    "Огромный прекрасный дв орец",
    "Маленький ужасный дворец",
    "Красивый гостевой домик",
    "Некрасивый него степриимный домик",
    "Уютное бунгало далеко от моря",
    "Неуютное бунгало по колено в воде"
];

let types = [
    "palace",
    "flat",
    "house",
    "bungalo"
];

let times = [
    "12:00",
    "13:00",
    "14:00"
];

let features = [
    "wifi",
    "dishwasher",
    "parking",
    "washer",
    "elevator",
    "conditioner"
];



function createArrayPosts() {

    let arrayPosts = [];

    for (let i = 0; i <= 7; i++) {
        x = generatRandomValue(0, WIDTH_POOL);
        y = generatRandomValue(130, 630);

        let poster = {
    
            "author": {

                "avatar": 'img/avatars/user0'+ (i+1) +'.png'

            },
    
            "offer": {

                "title": titles[i],
                "address": x + ', ' + y,
                "price": generatRandomValue(1000, 1000000),
                "type": types[ generatRandomValue(0, types.length-1) ],
                "rooms": generatRandomValue(1, 5),
                "guest": generatRandomValue(2, 10),
                "checkin": times[ generatRandomValue(0, times.length - 1) ],
                "checkout": times[ generatRandomValue(0, times.length - 1) ],
                "features": features[ generatRandomValue(0, features.length - 1) ],
                "description": '',
                "photos": '',
    
            },
    
            "location": {

                "x": x,
                "y": y,

            },
        }

        arrayPosts.push(poster);
    }

    return arrayPosts;
}

console.log(createArrayPosts());



