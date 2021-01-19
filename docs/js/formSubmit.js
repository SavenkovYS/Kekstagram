function submitForm() {
    const pictureSubmitForm = document.getElementById('upload-select-image');
    const URL = 'https://javascript.pages.academy/kekstagram';

    pictureSubmitForm.addEventListener('submit', onFormSubmit);

    async function onFormSubmit(event) {
        event.preventDefault();     
        try {
            let response = await fetch(URL,  {
                method: 'POST',
                mode: "no-cors",
                body: new FormData(pictureSubmitForm)
            });
    
            let result = await response.text();
        } catch(error) {
           alert(error.message)
        }     
    }
}

export default submitForm;