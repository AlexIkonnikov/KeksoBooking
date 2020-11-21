'use strict';

(function() {

    let map = document.querySelector('.map');
    let template = document.querySelector('template').content;
    let card = template.querySelector('.map__card');
    let photoList = card.querySelector('.popup__pictures');
    let filterContainer = map.querySelector('.map__filters-container');

    function showPost(obj) {
    
        let article = map.querySelector('article');
    
        if (article) {
            let old = map.removeChild(article);  
        }
    
        let copyPost = card.cloneNode(true);
        copyPost.querySelector('.popup__avatar').src = obj.author.avatar;
        copyPost.querySelector('.popup__title').textContent = obj.offer.title;
        copyPost.querySelector('.popup__text--address').textContent = obj.offer.address;
        copyPost.querySelector('.popup__text--price').textContent = obj.offer.price + " ₽/ночь";
        copyPost.querySelector('.popup__type').textContent = obj.offer.type;
        copyPost.querySelector('.popup__text--capacity').textContent = obj.offer.rooms + " комнаты для " + obj.offer.guests + " гостей";
        copyPost.querySelector('.popup__text--time').textContent = "Заезд после " + obj.offer.checkin + ", выезд после " + obj.offer.checkout; 
        copyPost.querySelector('.popup__features').textContent = obj.offer.features;
        copyPost.querySelector('.popup__description').textContent = obj.offer.description;
        map.insertBefore(copyPost, filterContainer);
        outputPhoto(obj.offer.photos);
    }

    window.cart = {
        'template': template,
        'map': map,
        'showPost': showPost
    };

    function outputPhoto (photoArr) {
    
        for (let i = 0; i <= photoArr.length - 1; i++) {
            let pools = map.querySelectorAll('.popup__pictures');
            let photo = photoList.querySelector('li').cloneNode(true);
            photo.querySelector('img').src = photoArr[i];
            pools[pools.length - 1].appendChild(photo);
    
        }
    
    }
    

})();