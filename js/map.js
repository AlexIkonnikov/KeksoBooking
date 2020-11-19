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
let form = document.querySelector('.notice__form');









