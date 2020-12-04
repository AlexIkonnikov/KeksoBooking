'use strict';

(function() {
    let pool = window.cart.map.querySelector('.map__pins');
    let WIDTH_POOL = pool.offsetWidth;
    let HEIGHT_POOL = pool.offsetHeight;
    let pin = window.cart.template.querySelector('.map__pin');
    let pins =[];
    let ESC_KEYCODE = 27;

    function onKeyDown (evt) {
        if (evt.keyCode == ESC_KEYCODE) {
            closeCart();
            document.removeEventListener('keydown', onKeyDown);
        }
    }

    function closeCart () {
        let article = document.querySelector('article');
        if (article) {
            window.cart.map.removeChild(article);
        }
    }

    function preparationAds(arr) {

        let length = arr.length > 5 ? 5: arr.length;
        for (let i = 0; i < length; i++) {
            let copyPin = pin.cloneNode(true);
            copyPin.style = "left:" + arr[i].location.x + "px;" + "top:" + arr[i].location.y + "px;"; 
            copyPin.querySelector('img').src = arr[i].author.avatar;
            copyPin.querySelector('img').alt = arr[i].offer.title;
            pins.push(copyPin);
            renderPin(copyPin, arr[i]);
        }

    }

    function renderPin (pin, obj) {

        pool.appendChild(pin);

        pin.addEventListener('click', function() {
            window.cart.showPost(obj);
            let close = document.querySelector('.popup__close'); 
            close.addEventListener('click', closeCart);
            document.addEventListener('keydown', onKeyDown);  
        }); 
    }

    function deletePins () {
        pins.forEach( function(it) {
            it.remove();
        });
    }

    window.pin = {
        'widthPool': WIDTH_POOL,
        'heightPool': HEIGHT_POOL,
        'renderPins': renderPin,
        'preparationAds': preparationAds,
        'deletePins': deletePins,
        'closeCart': closeCart
    };

})();