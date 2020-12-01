'use strict';

(function(){
    let inputFile = document.querySelector('#avatar');
    let preview = document.querySelector('.notice__preview img');
    let inputFiles = document.querySelector('#images');
    let poolImage = document.querySelector('.preview-container');

    let typeFiles = ['jpg', 'jpeg', 'png', 'gif']

    inputFile.addEventListener('change', onFileHandler);

    function onFileHandler () {
        let photo = inputFile.files[0];
        let name = photo.name.toLowerCase();

        let matches = typeFiles.some(function(it) {
            return name.endsWith(it);
        })

        if (matches) {
            let reader = new FileReader();
            reader.addEventListener('load', function() {
                preview.src = reader.result;
            })

            reader.readAsDataURL(photo);
        }
    }

    inputFiles.addEventListener('change', onFilesHandler);

    function onFilesHandler() {
        let photo = inputFiles.files;

        for (let i = 0; i < photo.length; i++) {

            let name = photo[i].name.toLowerCase();
            let matches = typeFiles.some(function(it) {
                return name.endsWith(it);
            })

            if (matches) {
                let reader = new FileReader();
                reader.addEventListener('load', function() {
                    let img = document.createElement('img');
                    img.src =  reader.result;
                    poolImage.appendChild(img);
                })

                reader.readAsDataURL(photo[i]);
            }

        }
        
    }

})();