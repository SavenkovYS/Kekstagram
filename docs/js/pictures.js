const PICTURES_NUMBER = 25;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const pictures = [];

function getPictures() {
    for (let i = 1; i <= PICTURES_NUMBER; i++) {
        pictures.push({
            url: `photos/${i}.jpg`,
            likes: getLikes(),
            comments: getComment(),
            description: getDescription()
        })
    }

    function getLikes() {
        return Math.floor(MIN_LIKES + Math.random() * (MAX_LIKES - MIN_LIKES));
    }

    function getComment() {
        const COMMENTS = [
                        'Всё отлично',
                        'В целом всё неплохо. Но не всё',
                        'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально',
                        'Моя бабушка случайно чихнула с фотоаппаратом в руках, и у неё получилась фотография лучше',
                        'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота, и у меня получилась фотография лучше',
                        'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
                        ];
        const commentsNumber = Math.floor(1 + Math.random() * 2);
        const photoComments = [];

        let i = 0;
        while (i < commentsNumber) {
            const randomCommentIndex = Math.floor(Math.random() * COMMENTS.length);

            if (!photoComments.includes(COMMENTS[randomCommentIndex])) {
                photoComments.push(COMMENTS[randomCommentIndex]);
                i++;
            } 
        }

        return photoComments;
    }

    function getDescription() {
        const DESCRIPTIONS = [
                            'Тестим новую камеру!',
                            'Затусили с друзьями на море',
                            'Как же круто тут кормят',
                            'Отдыхаем...',
                            'Цените каждое мгновенье. Цените, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами.......',
                            'Вот это тачка!'
                            ];
        
        return DESCRIPTIONS[Math.floor(Math.random() * DESCRIPTIONS.length)]
    }
}

getPictures()


const pictureTemplate = document.getElementById('picture').content;
const pictureContainer = document.querySelector('.pictures');

function createPictures() {
    for (let i = 0; i < pictures.length; i++) {
        const pictureElement = pictureTemplate.cloneNode(true);
        pictureElement.querySelector('.picture__img').src = pictures[i].url;
        pictureElement.querySelector('.picture__stat--comments').textContent = pictures[i].comments.length;
        pictureElement.querySelector('.picture__stat--likes').textContent = pictures[i].likes;

        pictureContainer.appendChild(pictureElement);
    }
}

createPictures()


const AVATARS_NUMBER = 6;
const bigPictureOverlay = document.querySelector('.big-picture');
const commentTemplate = document.getElementById('comment').content;
const commentsContainer = bigPictureOverlay.querySelector('.social__comments');
const allPictures = document.querySelectorAll('.picture__link');
const closeButton = document.getElementById('picture-cancel');

function showBigPicture() {
    for (let i = 0; i < pictures.length; i++) {
        allPictures[i].addEventListener('click', () => {
            bigPictureOverlay.classList.remove('hidden');
            commentsContainer.innerHTML = '';

            bigPictureOverlay.querySelector('img').src = pictures[i].url;
            bigPictureOverlay.querySelector('.likes-count').textContent = pictures[i].likes;
            bigPictureOverlay.querySelector('.comments-count').textContent = pictures[i].comments.length;
            bigPictureOverlay.querySelector('.social__caption').textContent = pictures[i].description;   

            for (let j = 0; j < pictures[0].comments.length; j++) {
                const commentElement = commentTemplate.cloneNode(true);
                const avatarNumber = Math.floor(Math.random() * 6 + 1);
                commentElement.querySelector('.social__picture').src = `img/avatar-${avatarNumber}.svg`;
                commentElement.querySelector('.social__text').textContent = pictures[i].comments[j];
        
                commentsContainer.appendChild(commentElement);
            }

            closeButton.addEventListener('click', () => bigPictureOverlay.classList.add('hidden'));
            bigPictureOverlay.addEventListener('click', (event) => {
                if(event.target === bigPictureOverlay) {
                    bigPictureOverlay.classList.add('hidden');
                }
            })
        })
    }  
}

showBigPicture()

const uploadInput = document.getElementById('upload-file');

uploadInput.addEventListener('change', handleFileUpload)

function handleFileUpload() {
    const uploadOverlay = document.querySelector('.img-upload__overlay')
    uploadOverlay.classList.remove('hidden');

    document.getElementById('upload-cancel').addEventListener('click', () => {
        uploadInput.value = '';
        uploadOverlay.classList.add('hidden');
    });
}


const hashtagsInput = document.querySelector('.text__hashtags');
const uploadForm = document.getElementById('upload-select-image');

let userHashtags = []

hashtagsInput.addEventListener('input', handleHashtagInput)

function handleHashtagInput() {
    userHashtags = hashtagsInput.value.trim().split(' ').filter(item => item !== '');  
    
    const lowerCaseHashtags = userHashtags.map(hashtag => hashtag.toLowerCase());

    console.log(lowerCaseHashtags);

    lowerCaseHashtags.forEach((hashtag, i, initArray) => {

        if (hashtag[0] !== '#') {
            hashtagsInput.setCustomValidity('Хэштэг должен начинаться с #');
        } else if (hashtag === '#') {
            hashtagsInput.setCustomValidity('Хэштэг не может состоять только из символа #');
        } else if (hashtag.length > 20) {
            hashtagsInput.setCustomValidity('Максимальная длина хэштэга 20 символов');
        } else if (initArray.indexOf(hashtag) !== i) {
            hashtagsInput.setCustomValidity('Один хэштэг нельзя использовать дважды');
        } else if (initArray.length > 5) {
            hashtagsInput.setCustomValidity('Максимум можно поставить 5 хэштэгов');
        } else {
            hashtagsInput.setCustomValidity('');
        }
    })
}

const scaleUpBtn = document.querySelector('.resize__control--plus');
const scaleDownBtn = document.querySelector('.resize__control--minus');
let scaleValue = document.querySelector('.resize__control--value').value;
const userImg = document.querySelector('.img-upload__preview');
const SCALE_STEP = 25;

scaleUpBtn.addEventListener('click', () => {
    if(parseInt(scaleValue) < 100) {
        scaleValue = `${parseInt(scaleValue) + SCALE_STEP}%`;
        document.querySelector('.resize__control--value').value = scaleValue;
        userImg.style.transform = `scale(${parseInt(scaleValue) / 100})`;
    }
})

scaleDownBtn.addEventListener('click', () => {
    if(parseInt(scaleValue) > 25) {
        
        scaleValue = `${parseInt(scaleValue) - SCALE_STEP}%`;
        document.querySelector('.resize__control--value').value = scaleValue;
        userImg.style.transform = `scale(${parseInt(scaleValue) / 100})`;
    }
})

const filterBtns = document.querySelectorAll('.effects__radio');
const filterRangeContainer = document.querySelector('.img-upload__scale');
const filterRange = filterRangeContainer.querySelector('.scale__value');
const filterRangePin = filterRangeContainer.querySelector('.scale__pin');
const filterRangeLine = filterRangeContainer.querySelector('.scale__line');
const filterRangeLevel = filterRangeContainer.querySelector('.scale__level');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterRange.value = 100;
        setFilters();
        let value = null;
        for (let i = 0; i < filterBtns.length; i++) {
            value = filterBtns[i].value;
            if (filterBtns[i].checked) {
                userImg.classList.add(`effects__preview--${value}`);
            } else {
                userImg.classList.remove(`effects__preview--${value}`);
            }
        }
        
        if(btn.value === 'none') {
            filterRangeContainer.classList.add('hidden');
        } else {
            filterRangeContainer.classList.remove('hidden');
            filterRangePin.style.left = `${filterRangeLevel.offsetWidth}px`;   
        }
    })
})

filterRangePin.addEventListener('mousedown', event => {
    event.preventDefault();

    const filterLevelCoords = filterRangeLevel.getBoundingClientRect();
    const filterCoords = {};
    filterCoords.top = filterLevelCoords.top + pageYOffset;
    filterCoords.left = filterLevelCoords.left + pageXOffset;

    let newLeftPosition = null;
    const filterRangePinClientCoords = filterRangePin.getBoundingClientRect();
    const filterRangePinCoords = {};
    filterRangePinCoords.top = filterRangePinClientCoords.top + pageYOffset;
    filterRangePinCoords.left = filterRangePinClientCoords.left + pageXOffset;

    let right = filterRangeLine.offsetWidth;

    document.addEventListener('mousemove', handleMouseMove)

    function handleMouseMove(event) {
        event.preventDefault();

        newLeftPosition = event.pageX - filterCoords.left;
        if (newLeftPosition < 0) {
            newLeftPosition = 0;
        }
        if (newLeftPosition > right) {
            newLeftPosition = right;
        }
        filterRangePin.style.left = `${newLeftPosition}px`;

        filterRange.value = Math.floor(newLeftPosition / filterRangeLine.offsetWidth * 100);
        setFilters();
    
        document.addEventListener('mouseup', handleMouseUp)
    }
    
    function handleMouseUp() {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        
        setFilters();
    }
})

function setFilters() {
    const value = filterRange.value; 
    for (let i = 0; i < filterBtns.length; i++) {
        if (filterBtns[i].checked) {
            switch(filterBtns[i].value) {
                case 'none':
                    userImg.style.filter = null;
                    break;
                case 'chrome':
                    userImg.style.filter = `grayscale(${value / 100})`;
                    break;
                case 'sepia':
                    userImg.style.filter = `sepia(${value / 100})`;
                    break;
                case 'marvin':
                    userImg.style.filter = `invert(${value}%)`;
                    break;
                case 'phobos':
                    userImg.style.filter = `blur(${value / 100 * 3}px)`;
                    break;
                case 'heat':
                    userImg.style.filter = `brightness(${1 + value / 100 * 2})`;
                    break;
            }
        }
    } 
}

