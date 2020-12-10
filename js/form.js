'use strict';

(function() {
    
    window.form = document.querySelector('.notice__form');
    let pricePerNight = form.querySelector('#price');
    let typeHouse = form.querySelector('#type');
    let timeIn = form.querySelector('#timein');
    let timeOut = form.querySelector('#timeout');
    let numberOfRooms = form.querySelector('#room_number');
    let numbersOfSeats = form.querySelector('#capacity');
    let sendingResultWindow = document.querySelector('.success');
    let sendingResulText = sendingResultWindow.querySelector('.success__text');
    let sendingResultButton = sendingResultWindow.querySelector('.success__close');
    let formResetbutton = form.querySelector('.form__reset');
    let ESC_KEYCODE = 27;

    formResetbutton.addEventListener('click', function () {
        window.dnd.pageReset();
    });

    function onKeyDownHandler (evt) {
        if (evt.keyCode == ESC_KEYCODE) {
            sendingResultWindow.classList.add('hidden');
            document.removeEventListener('keydown', onKeyDownHandler);
            document.removeEventListener('click', onClickHandler);
            
        }
    }

    function onClickHandler (evt) {
        if (!(evt.target.closest('.success'))) {
            sendingResultWindow.classList.add('hidden');
            document.removeEventListener('keydown', onKeyDownHandler);
            document.removeEventListener('click', onClickHandler);
        }
    }

    let houseInfo = {
        bungalo: 0,
        flat: 1000,
        house: 5000,
        palace: 100000
    }

    function showSendingResultWindow (text) {
        sendingResultWindow.classList.remove('hidden');
        sendingResulText.textContent = text;
        sendingResultButton.addEventListener('click', closeSendingResultWindow);
    }

    function closeSendingResultWindow () {
        sendingResultWindow.classList.add('hidden');
    }
    
    function changeMinPricePerNight(evt) {

        pricePerNight.setAttribute('min', houseInfo[evt.target.value]);
        pricePerNight.setAttribute('placeholder', houseInfo[evt.target.value]);
    }
    
    function synchTime(time) {
    
        if (time === timeIn) {
            timeOut.value = timein.value;
        } else {timein.value = timeOut.value}
    
    }
    
    function formClickHandler(evt) {
        if (evt.target == timeIn || evt.target == timeOut){
            synchTime(evt.target);
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
        showSendingResultWindow(message);
    };

    let onSuccses = function () {
        window.dnd.pageReset();
        showSendingResultWindow('Отправка прошла успешно!');
        document.addEventListener('keydown', onKeyDownHandler);
        document.addEventListener('click', onClickHandler);
    }


    form.addEventListener('submit', function(evt) {
        evt.preventDefault();
        let formData = new FormData(window.form);
        window.backend.save(onError, onSuccses, formData);
    });
    
    typeHouse.addEventListener('change', changeMinPricePerNight);
    form.addEventListener('change', formClickHandler, true);

})();