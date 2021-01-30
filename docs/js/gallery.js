import showBigPicture from './bigPicture.js';

async function getPictures() {
    const url = 'https://javascript.pages.academy/kekstagram/data';
    const pictureTemplate = document.getElementById('picture').content;
    const picturesContainer = document.querySelector('.pictures');
    const imgFilterSection = document.querySelector('.img-filters');
    const imgFilterBtns = document.querySelectorAll('.img-filters__button');

    try {
        const response = await fetch(url);
        const pictures = await response.json();

        function displayPictures(picturesArray) {
            document.querySelectorAll('.picture__link').forEach(elem => elem.remove());

            picturesArray.forEach(picture => {
                const pictureElement = pictureTemplate.cloneNode(true);
                pictureElement.querySelector('.picture__img').src = picture.url;
                pictureElement.querySelector('.picture__stat--comments').textContent = picture.comments.length;
                pictureElement.querySelector('.picture__stat--likes').textContent = picture.likes;
        
                picturesContainer.appendChild(pictureElement);
            });
        }

        displayPictures(pictures);
        showBigPicture(pictures);

        imgFilterSection.classList.remove('img-filters--inactive');

        function debounce() {
            let lastTimeout = null;
            return function(images) {
                if (lastTimeout) {
                    clearTimeout(lastTimeout);
                }
                lastTimeout = setTimeout(() => {
                    displayPictures(images);
                    showBigPicture(images);
                }, 500) 
            }        
        }

        const debounceFunc = debounce();
        
        imgFilterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                for (let i = 0; i < imgFilterBtns.length; i++) {
                    imgFilterBtns[i].classList.remove('img-filters__button--active');
                }
                btn.classList.add('img-filters__button--active');

                let sortedImages = [];

                if (btn.id === 'filter-popular') {
                    sortedImages = [];
                    sortedImages = [...pictures];
                    debounceFunc(sortedImages);
                }

                if (btn.id === 'filter-new') {
                    const NEW_PICTURES_NUMBER = 10;
                    sortedImages = [];
                    let randomIndex = null;
                    for (let i = 0; i < NEW_PICTURES_NUMBER; i++) {
                        do {
                            randomIndex = Math.floor(Math.random() * pictures.length)
                        } while (sortedImages.includes(pictures[randomIndex]))

                        sortedImages.push(pictures[randomIndex]);
                    }
                    debounceFunc(sortedImages);
                }

                if (btn.id === 'filter-discussed') {
                    sortedImages = [];
                    sortedImages = pictures.slice().sort((a, b) => {
                        return b.comments.length - a.comments.length;
                    })
                    debounceFunc(sortedImages);
                }
            })
        })  
        
        
    } catch(error) {
        console.log(error);
    }
}

getPictures()

export default getPictures;
