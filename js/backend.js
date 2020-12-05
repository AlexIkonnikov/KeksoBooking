'use strict';

(function() {

    let URL = {
        load:'https://javascript.pages.academy/keksobooking/data',
        save: 'https://javascript.pages.academy/keksobooking'
    }

    let createXhr = function (method, url, onError, onSuccses) {
        let xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.timeout = 10000;
        xhr.open(method, url);
        xhr.addEventListener('load', function () {
            if (xhr.status === 200) {
                onSuccses(xhr.response);
                console.log(xhr.status);
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

        return xhr;
    };

    window.load = function(onError, onSuccses) {
        createXhr('GET', URL.load, onError, onSuccses).send();
    };
    
    window.save = function(onError, onSuccses, data) {
        createXhr('POST', URL.save, onError, onSuccses).send(data);
    };

    window.onError = function (message) {
        console.log(message);
    }

    window.backend = {
        load: load,
        save: save,
        onError: onError
    }


})();