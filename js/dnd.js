'use strict';

(function () {

    let mainPin = window.cart.map.querySelector('.map__pin--main');
    let PIN_TAIL = 18;
    let inputs = document.querySelectorAll('fieldset');
    let address = window.form.querySelector('#address');
    let beginLeft = mainPin.offsetLeft;
    let beginTop = mainPin.offsetTop;
    address.value = beginLeft + ', ' + beginTop;

    let dragLimit = {
        x: {
            min:0,
            max:window.pin.widthPool
        },
        y: {
            min:130 - PIN_TAIL - mainPin.offsetWidth,
            max:window.pin.heightPool
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

    function resetForm () {
        window.form.reset();
        address.value = parseInt(beginLeft) + ' ' + parseInt(beginTop);
        mainPin.style.left = beginLeft + 'px';
        mainPin.style.top = beginTop + 'px';
    }

    function mapReset() {
        window.cart.map.classList.add('map--faded');
        if (document.querySelector('.map article')) {
            document.querySelector('.map article').remove();
        }
        mainPin.addEventListener('mouseup', pageActivation);
        window.pin.deletePins();
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

    function pageReset () {
        window.filterForm.reset();
        deactivateForm(inputs);
        mapReset();
        resetForm();       
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
                TOP: dragLimit.y.min + mainPin.offsetHeight + PIN_TAIL,
                BOTTOM: dragLimit.y.max,
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

    window.dnd = {
        'pageReset': pageReset
    }
})();