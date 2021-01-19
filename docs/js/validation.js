import submitForm from './formSubmit.js';

function setValidity() {
    const hashtagsInput = document.querySelector('.text__hashtags');
    const commentInput = document.querySelector('.text__description');

    let userHashtags = [];
    let userComment = '';

    hashtagsInput.addEventListener('input', onHashtagInput);
    commentInput.addEventListener('input', onCommentInput);
    
    function onHashtagInput() {
        userHashtags = hashtagsInput.value.trim().split(' ').filter(item => item !== '');  
        const lowerCaseHashtags = userHashtags.map(hashtag => hashtag.toLowerCase());
        console.log(hashtagsInput.value)

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

    function onCommentInput() {
        if (userComment.length > 140) {
            commentInput.setCustomValidity('Длина комментария не должна превышать 140 символов');
        }
    }

    submitForm();
}

setValidity();

export default setValidity;


