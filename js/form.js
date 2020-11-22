'use strict';

(function() {
    
    window.form = document.querySelector('.notice__form');
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

    let onError = function (message) {

        console.log(message);

    };

    let onSuccses = function(message) {

        console.log(message);

    }



    form.addEventListener('submit', function(evt) {
        evt.preventDefault();
        let formData = new FormData(window.form);
        window.save(onError, onSuccses, formData);
    });
    
    typeHouse.addEventListener('change', changeMinPricePerNight);
    form.addEventListener('change', formClickHandler, true);

})();