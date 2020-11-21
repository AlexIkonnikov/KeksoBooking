'use strict';

(function() {

    window.load = function (onError, onSuccses) {

        let xhr = new XMLHttpRequest ();
        xhr.open('get', 'https://javascript.pages.academy/keksobooking/data');
        xhr.responseType = 'json';
        xhr.timeout = 10000;

        xhr.addEventListener('load', function() {

            if (xhr.status === 200) {

                onSuccses(xhr.response);

            } else {
                console.log('Ошибка! Код: ' + xhr.status);
            }
        });

        xhr.addEventListener('error', function() {
            onError('Ошибка! Код: ' + xhr.status);
        });

        xhr.addEventListener('timeout', function() {
            onError('Время ожидания ответа истекло');
        });

    };


})();