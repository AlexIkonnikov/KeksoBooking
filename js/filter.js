'use strict';

(function(){
    window.filterForm = document.querySelector('.map__filters');
    let selects = filterForm.querySelectorAll('.map__filters-container select');

    let housingType = filterForm.querySelector('#housing-type');
    let housingPrice = filterForm.querySelector('#housing-price');
    let housingRooms = filterForm.querySelector('#housing-rooms');
    let housingGuests = filterForm.querySelector('#housing-guests');

    let inputs = filterForm.querySelectorAll('.map__filters-container input');
    let filterWifi = filterForm.querySelector('#filter-wifi');
    let filterDishwasher = filterForm.querySelector('#filter-dishwasher');
    let filterParking = filterForm.querySelector('#filter-parking');
    let filterWasher = filterForm.querySelector('#filter-washer');
    let filterElevator = filterForm.querySelector('#filter-elevator');
    let filterConditioner = filterForm.querySelector('#filter-conditioner');

    function disabledElements (array) {
        array.forEach( function (it) {
            it.setAttribute('disabled', true);
        });
    }

    function activeElements (array) {
        array.forEach( function (it) {
            it.removeAttribute('disabled');
        });
    }

    function activationForm() {
        activeElements(inputs);
        activeElements(selects);
    }

    function disabledForm () {
        disabledElements(inputs);
        disabledElements(selects);
    }

    disabledForm();
    window.load(window.onerror, onSuccses);

    let timer;
    for (let i = 0; i < selects.length; i++) {
        selects[i].addEventListener('change', function(){
            if(timer) {
                clearInterval(timer);
            }    
            timer = setTimeout(updateMap, 400);
        });
    }

    for (let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('change', function(){
            if(timer) {
                clearInterval(timer);
            }
            timer = setTimeout(updateMap, 400);
        });
    }

    let ads = [];

    function onSuccses (data) {
        ads = data;
        activationForm();
    }

    function cleanMap () {
        let node = document.querySelectorAll('.map__pin--main ~ .map__pin');
        for(let i = 0; i < node.length; i++) {
            node[i].remove();
        }
        window.pin.closeCart();
    }
    
    function updateMap() {
        cleanMap();
        let typeHouse = ads.filter(function(it){
            if(housingType.value == 'any') {
                return it;
            } else {
               return it.offer.type == housingType.value;
            } 
        });

        let priceHouse = typeHouse.filter(function(it){
            if (housingPrice.value == 'any') {
                return it;
            } else if(housingPrice.value == 'low'){
                return (it.offer.price < 10000); 
            } else if(housingPrice.value == 'middle'){
                return (it.offer.price >= 10000 && it.offer.price < 50000);
            } else {
                return (it.offer.price >= 50000);
            } 
        });

        let roomsHouse = priceHouse.filter(function(it){
            if (housingRooms.value == 'any') {
                return it;
            } else {
                return it.offer.rooms == housingRooms.value;
            }
        });

        let guestsHouse = roomsHouse.filter(function(it){
            if (housingGuests.value == 'any') {
                return it;
            } else {
                return it.offer.guests == housingGuests.value;
            }
        });

        let wifi = guestsHouse.filter(function(it){
            if (filterWifi.checked) {
                for(let i = 0; i < it.offer.features.length; i++) {
                    if(it.offer.features[i] == filterWifi.value) {
                        return true;
                    }
                }
            } else {
                return it;
            }
        });

        let dishWasher = wifi.filter(function(it){
            if (filterDishwasher.checked) {
                for(let i = 0; i < it.offer.features.length; i++) {
                    if(it.offer.features[i] == filterDishwasher.value) {
                        return true;
                    }
                }
            } else {
                return it;
            }
        });

        let parking = dishWasher.filter(function(it){
            if (filterParking.checked) {
                for(let i = 0; i < it.offer.features.length; i++) {
                    if(it.offer.features[i] == filterParking.value) {
                        return true;
                    }
                }
            } else {
                return it;
            }
        });

        let washer = parking.filter(function(it){
            if (filterWasher.checked) {
                for(let i = 0; i < it.offer.features.length; i++) {
                    if(it.offer.features[i] == filterWasher.value) {
                        return true;
                    }
                }
            } else {
                return it;
            }
        });

        let elevator = washer.filter(function(it){
            if (filterElevator.checked) {
                for(let i = 0; i < it.offer.features.length; i++) {
                    if(it.offer.features[i] == filterElevator.value) {
                        return true;
                    }
                }
            } else {
                return it;
            }
        });

        let conditioner = elevator.filter(function(it){
            if (filterConditioner.checked) {
                for(let i = 0; i < it.offer.features.length; i++) {
                    if(it.offer.features[i] == filterConditioner.value) {
                        return true;
                    }
                }
            } else {
                return it;
            }
        });
    
        let newArray = conditioner;
        window.pin.preparationAds(newArray);
    }


})();