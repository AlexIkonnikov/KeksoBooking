'use strict';

(function() {

    window.load = function (onError, onSuccses) {

        let xhr = new XMLHttpRequest ();
        xhr.open('get', 'https://javascript.pages.academy/keksobooking/data');
        xhr.responseType = 'json';
        xhr.timeout = 10000;

        xhr.addEventListener('load', function() {

            if (xhr.status === 200) {
                console.log(xhr.status);
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

        xhr.send();

    };


    window.save = function (onError, onSuccses, data) {

        let xhr = new XMLHttpRequest ();
        
        xhr.responseType = 'json';
        xhr.timeout = 10000;
        xhr.addEventListener('load', function() {

            if (xhr.status === 200) {
                console.log(data);
                onSuccses('Данные отправленны!');

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

        xhr.open('POST', 'https://javascript.pages.academy/keksobooking');
        xhr.send(data);

    };


})();