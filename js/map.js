'use strict';
let map = document.querySelector('.map');
let filterContainer = map.querySelector('.map__filters-container');
let pool = map.querySelector('.map__pins');
let template = document.querySelector('template').content;
let card = template.querySelector('.map__card');
let photoList = card.querySelector('.popup__pictures');
let pin = template.querySelector('.map__pin');
let WIDTH_POOL = pool.offsetWidth;
let HEIGHT_POOL = pool.offsetHeight;
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
        copyPin.addEventListener('click', function() {
            creeatePost( arr[i] );
        })    
    }

}

function outputPhoto (photoArr) {
    
    for (let i = 0; i <= photoArr.length - 1; i++) {
        let pools = map.querySelectorAll('.popup__pictures');
        let photo = photoList.querySelector('li').cloneNode(true);
        photo.querySelector('img').src = photoArr[i];
        pools[pools.length - 1].appendChild(photo);

    }

}

function creeatePost (obj) {

    let article = map.querySelector('article');

    if (article) {
        let old = map.removeChild(article);  
    }

    let copyPost = card.cloneNode(true);
    copyPost.querySelector('.popup__avatar').src = obj.author.avatar;
    copyPost.querySelector('.popup__title').textContent = obj.offer.title;
    copyPost.querySelector('.popup__text--address').textContent = obj.offer.address;
    copyPost.querySelector('.popup__text--price').textContent = obj.offer.price + " ₽/ночь";
    copyPost.querySelector('.popup__type').textContent = obj.offer.type;
    copyPost.querySelector('.popup__text--capacity').textContent = obj.offer.rooms + " комнаты для " + obj.offer.guest + " гостей";
    copyPost.querySelector('.popup__text--time').textContent = "Заезд после " + obj.offer.checkin + ", выезд после " + obj.offer.checkout; 
    copyPost.querySelector('.popup__features').textContent = obj.offer.features;
    /*copyPost.querySelector('.popup__description').textContent = arr[i].offer.description;*/
    map.insertBefore(copyPost, filterContainer);
    outputPhoto(obj.offer.photos);

}



/*
createPins(arrayPosts);
creeatePost(arrayPosts);*/



/*--------------------------------------------------------------------------------------*/
let inputs = document.querySelectorAll('fieldset');
let mainPin = map.querySelector('.map__pin--main');
let form = document.querySelector('.notice__form');
let address = form.querySelector('#address');
/*
mainPin.style.top = '400px';
mainPin.style.left = WIDTH_POOL/2 + 'px';*/

setDisabled(inputs);

function setDisabled (arrayInputs) {

    for (let i = 0; i <= arrayInputs.length - 1; i++) {

        arrayInputs[i].setAttribute('disabled', true);

    }

}

function unsetDisabled (arrayInputs) {

    for (let i = 0; i <= arrayInputs.length - 1; i++) {

        arrayInputs[i].removeAttribute('disabled');

    }

}


address.value = WIDTH_POOL/2 + ' ' + HEIGHT_POOL/2;



function pageActivation () {

    map.classList.remove('map--faded');
    form.classList.remove('notice__form--disabled');
    unsetDisabled(inputs);
    createPins(arrayPosts);
}



mainPin.addEventListener('mouseup', pageActivation);

let pricePerNight = form.querySelector('#price');
let typeHouse = form.querySelector('#type');
let timeIn = form.querySelector('#timein');
let timeOut = form.querySelector('#timeout');
let numberOfRooms = form.querySelector('#room_number');
let numbersOfSeats = form.querySelector('#capacity');


function changeMinPricePerNight() {
    
    switch(typeHouse.value) {
        case 'bungalo': 
            pricePerNight.setAttribute('min', 0); 
            pricePerNight.setAttribute('placeholder', 0);
            break;

        case 'flat':
            pricePerNight.setAttribute('min', 1000); 
            pricePerNight.setAttribute('placeholder', 1000);
            break;
        
        case 'house':
            pricePerNight.setAttribute('min', 5000); 
            pricePerNight.setAttribute('placeholder', 5000);
            break;
            
        case 'palace':
            pricePerNight.setAttribute('min', 10000); 
            pricePerNight.setAttribute('placeholder', 10000);
            break; 
    }       
}

function synchTime(time) {

    if (time === timeIn) {
        timeOut.value = timein.value;
    } else {timein.value = timeOut.value}

}

function formClickHandler(evt) {
    if (evt.target == timeIn || evt.target == timeOut){

        synchTime(evt.target);

    } else if (evt.target == numberOfRooms || evt.target == numbersOfSeats) {

    }
}

numberOfRooms.addEventListener('change' , selectChangeHandler);

function selectChangeHandler() {

    if( numberOfRooms.value == 100) {
        for (let i = 0; i <= numbersOfSeats.options.length - 1; i++) {
            if (numbersOfSeats.options[i].value == 0) {
                numbersOfSeats.options[i].setAttribute('selected', true)
            }
            numbersOfSeats.options[i].setAttribute('disabled',true);
        }

    } else {
        numbersOfSeats.value = numberOfRooms.value;
        for (let i = 0; i <= numbersOfSeats.options.length - 1; i++) {

            if(numbersOfSeats.options[i].value > numberOfRooms.value || numbersOfSeats.options[i].value == 0) {

                numbersOfSeats.options[i].setAttribute('disabled', true);

            } else {
                numbersOfSeats.options[i].removeAttribute('disabled');
                numbersOfSeats.options[i].setAttribute('selected', true);
            }
        }

    }

}


typeHouse.addEventListener('change', changeMinPricePerNight);
form.addEventListener('change', formClickHandler, true);