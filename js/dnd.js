'use strict';

(function () {

    let mainPin = window.cart.map.querySelector('.map__pin--main');
    let inputs = document.querySelectorAll('fieldset');
    let address = window.form.querySelector('#address');
    address.value = window.pin.widthPool/2 + ', ' + window.pin.heightPool/2;

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
            if (mainPin.offsetTop - shift.y <= 130) {
                mainPin.style.top = 130 + "px";
    
            } else if (mainPin.offsetTop - shift.y >= 680) {
                mainPin.style.top = 680 + "px";
    
            } else if (mainPin.offsetLeft - shift.x <= 30) {
                mainPin.style.left = 30 + "px";
            } else if (mainPin.offsetLeft - shift.x >=  1150) {
                mainPin.style.left = 1150 + "px";
            } else {
                mainPin.style.top = (mainPin.offsetTop - shift.y) + "px";
                mainPin.style.left = (mainPin.offsetLeft - shift.x) + "px";
                address.value = (mainPin.offsetLeft - shift.x) + ', ' + (mainPin.offsetTop - shift.y);
            }
    
        }
    
        function onMouseUp () {
    
            if (drag) {

                if (!isPageActive) {
                    pageActivation();
                }

                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', pageActivation);
            }
        }
    
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    }
    
    
    mainPin.addEventListener('mousedown', onMouseUpHandler);
    
    function onError (message) {
        console.log(message);
    }

    let isPageActive = false;
    function pageActivation () {
        window.cart.map.classList.remove('map--faded');
        window.form.classList.remove('notice__form--disabled');
        unsetDisabled(inputs);
        window.load(onError , window.pin.showPins);
        isPageActive = true;
    }

})();