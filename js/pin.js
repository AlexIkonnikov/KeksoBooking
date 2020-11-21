'use strict';

(function() {
    let pool = window.cart.map.querySelector('.map__pins');
    let WIDTH_POOL = pool.offsetWidth;
    let HEIGHT_POOL = pool.offsetHeight;
    let pin = window.cart.template.querySelector('.map__pin');
    let isFirst = true;

    function showPins(arr) {

        if (isFirst) {
            for (let i = 0; i <= arr.length - 1; i++) {
            
                let copyPin = pin.cloneNode(true);
                copyPin.style = "left:" + arr[i].location.x + "px;" + "top:" + arr[i].location.y + "px;"; 
                copyPin.querySelector('img').src = arr[i].author.avatar;
                copyPin.querySelector('img').alt = arr[i].offer.title;
                pool.appendChild(copyPin);
                copyPin.addEventListener('click', function() {
                    window.cart.showPost( arr[i] );
                    let close = document.querySelector('.popup__close'); 
                    close.addEventListener('click', function() {
                        let article = document.querySelector('article');
                        window.cart.map.removeChild(article);
                    })
                })    
            }
            isFirst = false;
        }
    
    }

    window.pin = {
        'widthPool': WIDTH_POOL,
        'heightPool': HEIGHT_POOL,
        'showPins': showPins,
    };

})();