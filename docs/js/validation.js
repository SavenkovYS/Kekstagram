import submitForm from './formSubmit.js';

function setValidity() {
    const hashtagsInput = document.querySelector('.text__hashtags');
    const commentInput = document.querySelector('.text__description');

    let userHashtags = [];
    let userComment = '';

    

    hashtagsInput.addEventListener('input', onHashtagInput);
    commentInput.addEventListener('input', onCommentInput);

    function checkValidity(hashtags) {
        for (let i = 0; i < hashtags.length; i++) {
            if (hashtags[i][0] !== '#') {
                return 'Хэштэг должен начинаться с #';
            } else if (hashtags[i] === '#') {
                return 'Хэштэг не может состоять только из символа #';
            } else if (hashtags[i].length > 20) {
                return 'Максимальная длина хэштэга 20 символов';
            } else if (hashtags.indexOf(hashtags[i]) !== i) {
                return 'Один хэштэг нельзя использовать дважды';
            } else if (hashtags.length > 5) {
                return 'Максимум можно поставить 5 хэштэгов';
            }  
        }
        return '';
    }

    function onHashtagInput() {
        userHashtags = hashtagsInput.value.trim().split(' ').filter(item => item !== '');  
        const lowerCaseHashtags = userHashtags.map(hashtag => hashtag.toLowerCase());

        let message = checkValidity(lowerCaseHashtags);
        console.log(message)
        hashtagsInput.setCustomValidity(message);
        if(message !== '') {
            console.log(hashtagsInput.className)
            hashtagsInput.classList.add('text__hashtags--error');
        } else {
            hashtagsInput.classList.remove('text__hashtags--error')
        }
    }

    function onCommentInput() {
        if (userComment.length > 140) {
            commentInput.setCustomValidity('Длина комментария не должна превышать 140 символов');
        }

        commentInput.setCustomValidity('');
    }

    submitForm();
}

setValidity();

export default setValidity;


