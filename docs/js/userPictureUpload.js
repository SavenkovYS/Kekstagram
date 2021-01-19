function uploadPicture() {
    const uploadInput = document.getElementById('upload-file');

    uploadInput.addEventListener('change', onInputChange)

    function onInputChange() {
        const uploadOverlay = document.querySelector('.img-upload__overlay');
        const imagePreview = document.getElementById('user-picture');

        const file = uploadInput.files[0];

        if(file) {
            const reader = new FileReader();

            reader.addEventListener('load', () => imagePreview.src = reader.result);

            reader.readAsDataURL(file);
        }

        uploadOverlay.classList.remove('hidden');

        document.getElementById('upload-cancel').addEventListener('click', () => {
            closeEditor();
        });

        document.addEventListener('keydown', onKeyDown)

        function onKeyDown(event) {
            const ESC_KEYCODE = 27;
            const hashtagInput = document.querySelector('.text__hashtags');
            const commentInput = document.querySelector('.text__description');
            if(event.keyCode === ESC_KEYCODE && 
               document.activeElement !== hashtagInput && 
               document.activeElement !== commentInput) {
                   closeEditor();  
            }
        }

        function closeEditor() {
            uploadInput.value = '';
            uploadOverlay.classList.add('hidden');  
            document.removeEventListener('keydown', onKeyDown);
        }
    }
}

uploadPicture()

export default uploadPicture;