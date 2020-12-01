'use strict';

(function () {

    let mainPin = window.cart.map.querySelector('.map__pin--main');
    let inputs = document.querySelectorAll('fieldset');
    let address = window.form.querySelector('#address');
    address.value = window.pin.widthPool/2 + ', ' + window.pin.heightPool/2;

    let dragLimit = {
        x: {
            min:0,
            max:1200
        },
        y: {
            min:0,
            max:750
        }
    }

    function deactivateForm (arrayInputs) {
        arrayInputs.forEach(function (it) {
            it.setAttribute('disabled', true);
        });
        window.form.classList.add('notice__form--disabled');
    }

    function activateForm (arrayInputs) {
        arrayInputs.forEach(function (it) {
            it.removeAttribute('disabled');
        });
        window.form.classList.remove('notice__form--disabled');
    }

    function mapActivation () {
        window.cart.map.classList.remove('map--faded');
        window.load(window.onError, window.pin.preparationAds);
    }

    function pageActivation () {
        mapActivation();
        activateForm(inputs);
        mainPin.removeEventListener('mouseup', pageActivation);
    }

    function onMouseUpHandler (evt) {

        evt.preventDefault();
        let drag = false; 

        let startCoordinates = {
            x: evt.clientX,
            y: evt.clientY
        };
    
        function onMouseMove (evt) {
            evt.preventDefault();
            drag = true;
            
            let shift = {
                x: startCoordinates.x - evt.clientX,
                y: startCoordinates.y - evt.clientY
            };
    
            startCoordinates = {
                x: evt.clientX,
                y: evt.clientY
            };

            let mainPinPosition = {
                x: mainPin.offsetLeft - shift.x,
                y: mainPin.offsetTop - shift.y
            };

            let border = {
                TOP: dragLimit.y.min + mainPin.offsetHeight,
                BOTTOM: dragLimit.y.max - mainPin.offsetHeight,
                LEFT: dragLimit.x.min + mainPin.offsetWidth/2,
                RIGHT: dragLimit.x.max - mainPin.offsetWidth/2
            }

            if (mainPinPosition.x >= border.LEFT && mainPinPosition.x <= border.RIGHT ) {
                mainPin.style.left = (mainPinPosition.x) + "px";
            }

            if (mainPinPosition.y >= border.TOP && mainPinPosition.y <= border.BOTTOM ) {
                mainPin.style.top = (mainPinPosition.y) + "px";
            }

            address.value = parseInt(mainPin.style.left) + ' ' + parseInt(mainPin.style.top);
    
        }
    
        function onMouseUp () {
    
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', pageActivation);
            
        }
    
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    }
    
    
    mainPin.addEventListener('mousedown', onMouseUpHandler);
    mainPin.addEventListener('mouseup', pageActivation);
    deactivateForm(inputs);
})();