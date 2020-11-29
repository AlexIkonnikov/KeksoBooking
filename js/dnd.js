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

    setDisabled (inputs);

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

            let mainPinPosition = {
                x: mainPin.offsetLeft - shift.x,
                y: mainPin.offsetTop - shift.y
              };

            let border = {
                TOP: dragLimit.y.min + mainPin.offsetHeight,
                BOTTOM: dragLimit.y.max - mainPin.offsetHeight,
                LEFT: dragLimit.x.min,
                RIGHT: dragLimit.x.max
            }

            if(mainPinPosition.x >= border.LEFT && mainPinPosition.x <= border.RIGHT ) {
                mainPin.style.left = (mainPinPosition.x) + "px";
            }

            if(mainPinPosition.y >= border.TOP && mainPinPosition.y <= border.BOTTOM ) {
                mainPin.style.top = (mainPinPosition.y) + "px";
            }

            address.value = parseInt(mainPin.style.left) + ' ' + parseInt(mainPin.style.top);
    
        }
    
        function onMouseUp () {
    
            if (drag) {

                if (isPageActive === false) {
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
    

    let isPageActive = false;

    function pageActivation () {
        window.cart.map.classList.remove('map--faded');
        window.form.classList.remove('notice__form--disabled');
        window.load(window.onError, window.pin.preparationAds);
        unsetDisabled(inputs);
        isPageActive = true;
    }

})();