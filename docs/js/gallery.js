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

        function drawPictures(picturesArray) {
            document.querySelectorAll('.picture__link').forEach(elem => elem.remove());

            picturesArray.forEach(picture => {
                const pictureElement = pictureTemplate.cloneNode(true);
                pictureElement.querySelector('.picture__img').src = picture.url;
                pictureElement.querySelector('.picture__stat--comments').textContent = picture.comments.length;
                pictureElement.querySelector('.picture__stat--likes').textContent = picture.likes;
        
                picturesContainer.appendChild(pictureElement);
            });
        }

        let sortedImages = [...pictures];

        drawPictures(sortedImages);
        showBigPicture(sortedImages);

        imgFilterSection.classList.remove('img-filters--inactive');

        imgFilterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                for (let i = 0; i < imgFilterBtns.length; i++) {
                    imgFilterBtns[i].classList.remove('img-filters__button--active');
                }
                btn.classList.add('img-filters__button--active');

                if (btn.id === 'filter-popular') {
                    sortedImages = [];
                    sortedImages = [...pictures];
                    drawPictures(sortedImages);
                    showBigPicture(sortedImages);
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
                    drawPictures(sortedImages);
                    showBigPicture(sortedImages);
                }

                if (btn.id === 'filter-discussed') {
                    sortedImages = [];
                    sortedImages = pictures.slice().sort((a, b) => {
                        return b.comments.length - a.comments.length;
                    })
                    drawPictures(sortedImages);
                    showBigPicture(sortedImages);   
                }
            })
        })

    } catch(error) {
        console.log(error);
    }
}

getPictures()

export default getPictures;
