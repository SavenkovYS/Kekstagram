import showBigPicture from './bigPicture.js';

async function getPictures() {
    const url = 'https://javascript.pages.academy/kekstagram/data';
    const pictureTemplate = document.getElementById('picture').content;
    const picturesContainer = document.querySelector('.pictures');

    try {
        const response = await fetch(url);
        const pictures = await response.json();

        pictures.forEach(picture => {
            const pictureElement = pictureTemplate.cloneNode(true);
            pictureElement.querySelector('.picture__img').src = picture.url;
            pictureElement.querySelector('.picture__stat--comments').textContent = picture.comments.length;
            pictureElement.querySelector('.picture__stat--likes').textContent = picture.likes;
    
            picturesContainer.appendChild(pictureElement);
        });

        showBigPicture(pictures)

    } catch(error) {
        console.log(error);
    }
}

getPictures()

export default getPictures;
