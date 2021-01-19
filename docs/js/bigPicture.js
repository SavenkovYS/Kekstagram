function showBigPicture(pictures) {

    const bigPictureOverlay = document.querySelector('.big-picture');
    const commentTemplate = document.getElementById('comment').content;
    const commentsContainer = bigPictureOverlay.querySelector('.social__comments');
    const allPictures = document.querySelectorAll('.picture__link');
    const closeButton = document.getElementById('picture-cancel');
   
    for (let i = 0; i < pictures.length; i++) {
        allPictures[i].addEventListener('click', () => {
            bigPictureOverlay.classList.remove('hidden');
            commentsContainer.innerHTML = '';

            bigPictureOverlay.querySelector('img').src = pictures[i].url;
            bigPictureOverlay.querySelector('.likes-count').textContent = pictures[i].likes;
            bigPictureOverlay.querySelector('.comments-count').textContent = pictures[i].comments.length;
            bigPictureOverlay.querySelector('.social__caption').textContent = pictures[i].description;   

            pictures[i].comments.forEach(comment => {
                const commentElement = commentTemplate.cloneNode(true);
                commentElement.querySelector('.social__picture').src = `${comment.avatar}`;
                commentElement.querySelector('.social__text').textContent = comment.message;
        
                commentsContainer.appendChild(commentElement);
            })

            closeButton.addEventListener('click', () => bigPictureOverlay.classList.add('hidden'));
            bigPictureOverlay.addEventListener('click', event => {
                if(event.target === bigPictureOverlay) {
                    bigPictureOverlay.classList.add('hidden');
                }
            })
        })
    }  
}
export default showBigPicture;