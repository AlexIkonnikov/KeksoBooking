'use strict';

(function() {

    let isFirst = true;
    window.showPins = function (arr) {

    if (isFirst) {
        for (let i = 0; i <= arr.length - 1; i++) {
        
            let copyPin = pin.cloneNode(true);
            copyPin.style = "left:" + arr[i].location.x + "px;" + "top:" + arr[i].location.y + "px;"; 
            copyPin.querySelector('img').src = arr[i].author.avatar;
            copyPin.querySelector('img').alt = arr[i].offer.title;
            pool.appendChild(copyPin);
            copyPin.addEventListener('click', function() {
                window.showPost( arr[i] );
            })    
        }
        isFirst = false;
    }

}

})();