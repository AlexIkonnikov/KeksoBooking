'use strict';
let map = document.querySelector('.map');
let filterContainer = map.querySelector('.map__filters-container');
let pool = map.querySelector('.map__pins');
let template = document.querySelector('template').content;
let card = template.querySelector('.map__card');
let photoList = card.querySelector('.popup__pictures');
let pin = template.querySelector('.map__pin');
let WIDTH_POOL = pool.offsetWidth;
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
        x = generatRandomValue(24, WIDTH_POOL);
        y = generatRandomValue(130, 630);

        let poster = {
    
            "author": {

                "avatar": 'img/avatars/user0'+ (i+1) +'.png'

            },
    
            "offer": {

                "title": titles[i],
                "address": x + ', ' + y,
                "price": generatRandomValue(1000, 1000000),
                "type": typeConverter( types[ generatRandomValue(0, types.length-1) ] ) ,
                "rooms": generatRandomValue(1, 5),
                "guest": generatRandomValue(2, 5),
                "checkin": times[ generatRandomValue(0, times.length - 1) ],
                "checkout": times[ generatRandomValue(0, times.length - 1) ],
                "features": features[ generatRandomValue(0, features.length - 1) ],
                "description": '',
                "photos": [
                    "img/rooms/bathroom.jpg",
                    "img/rooms/dizain_interera.jpg",
                    "img/rooms/bedroom.jpg"  
                ],
    
            },
    
            "location": {

                "x": x,
                "y": y,

            },
        }

        arrayPosts.push(poster);
    }
    map.classList.remove('map--faded');
    return arrayPosts;
}

let arrayPosts = createArrayPosts();

function typeConverter (value) {

    switch(value) {
        case 'palace': return 'Дворец';
        case 'flat': return 'Квартира';
        case 'house': return 'Дом';
        case 'bungalo': return 'Бунгало';
    }

}

function createPins (arr) {

    for (let i = 0; i <= arr.length - 1; i++) {
        
        let copyPin = pin.cloneNode(true);
        copyPin.style = "left:" + arr[i].location.x + "px;" + "top:" + arr[i].location.y + "px;"; 
        copyPin.querySelector('img').src = arr[i].author.avatar;
        copyPin.querySelector('img').alt = arr[i].offer.title;
        pool.appendChild(copyPin);

    }

}

function outputPhoto (photoArr) {
    
    for (let i = 0; i <= photoArr.length - 1; i++) {

        let photo = photoList.querySelector('li').cloneNode(true);
        photo.querySelector('img').src = photoArr[i];
        photoList.appendChild(photo);

    }

}

function creeatePost (arr) {

    for (let i = 0; i <= arr.length - 1; i++) {

        let copyPost = card.cloneNode(true);
        copyPost.querySelector('.popup__avatar').src = arr[i].author.avatar;
        copyPost.querySelector('.popup__title').textContent = arr[i].offer.title;
        copyPost.querySelector('.popup__text--address').textContent = arr[i].offer.address;
        copyPost.querySelector('.popup__text--price').textContent = arr[i].offer.price + " ₽/ночь";
        copyPost.querySelector('.popup__type').textContent = arr[i].offer.type;
        copyPost.querySelector('.popup__text--capacity').textContent = arr[i].offer.rooms + " комнаты для " + arr[i].offer.guest + " гостей";
        copyPost.querySelector('.popup__text--time').textContent = "Заезд после " + arr[i].offer.checkin + ", выезд после " + arr[i].offer.checkout; 
        copyPost.querySelector('.popup__features').textContent = arr[i].offer.features;
        /*copyPost.querySelector('.popup__description').textContent = arr[i].offer.description;*/
        map.insertBefore(copyPost, filterContainer);

    }
}

createPins(arrayPosts);
creeatePost(arrayPosts);





