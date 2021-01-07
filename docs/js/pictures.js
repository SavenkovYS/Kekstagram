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

