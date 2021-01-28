function showBigPicture(pictures) {

    const bigPictureOverlay = document.querySelector('.big-picture');
    const commentTemplate = document.getElementById('comment').content;
    const commentsContainer = bigPictureOverlay.querySelector('.social__comments');
    const allPictures = document.querySelectorAll('.picture__link');
    const closeButton = document.getElementById('picture-cancel');
   
    for (let i = 0; i < pictures.length; i++) {
        allPictures[i].addEventListener('click', () => {
            document.body.classList.add('modal-open');
            bigPictureOverlay.classList.remove('hidden');
            commentsContainer.innerHTML = '';
            document.querySelector('.social__comment-count').innerHTML = `5 из <span class="comments-count">125</span> комментариев`

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

            const LoadMoreBtn = document.querySelector('.social__loadmore'); 
            const allComments = document.querySelectorAll('.social__comment');
 
            const INITIAL_COMMENTS_NUMBER = 5;
            const COMMENTS_TO_LOAD_STEP = 5;
            let shownCommentsNumber = INITIAL_COMMENTS_NUMBER;
        
            if(allComments.length > INITIAL_COMMENTS_NUMBER) {
                LoadMoreBtn.classList.remove('hidden');
                for (let i = INITIAL_COMMENTS_NUMBER; i < allComments.length; i++) {
                    allComments[i].classList.add('visually-hidden');
                }    
            }
        
            LoadMoreBtn.addEventListener('click', onLoadMoreClick)

            function onLoadMoreClick() {
                for (let i = shownCommentsNumber; i < shownCommentsNumber + COMMENTS_TO_LOAD_STEP; i++) {
                    if(allComments[i]) {
                        allComments[i].classList.remove('visually-hidden');
                    } else {
                        LoadMoreBtn.classList.add('hidden');
                        break;
                    }
                }
        
                if (shownCommentsNumber + COMMENTS_TO_LOAD_STEP < allComments.length) {
                    shownCommentsNumber += COMMENTS_TO_LOAD_STEP
                } else {
                    shownCommentsNumber = allComments.length;    
                }

                const commentsNumberHtml = `${shownCommentsNumber} из <span class="comments-count">${pictures[i].comments.length}</span> комментариев`;
                document.querySelector('.social__comment-count').innerHTML = commentsNumberHtml;
            }

            closeButton.addEventListener('click', () => closeBigPicture());

            bigPictureOverlay.addEventListener('click', event => {
                if(event.target === bigPictureOverlay) {
                    closeBigPicture();
                }
            });

            document.addEventListener('keydown', evt => {
                if(evt.keyCode === 27) {
                    closeBigPicture();
                }
            })

            function closeBigPicture() {
                bigPictureOverlay.classList.add('hidden');
                document.body.classList.remove('modal-open');
                LoadMoreBtn.removeEventListener('click', onLoadMoreClick)
            }
        })
    }  
}
export default showBigPicture;