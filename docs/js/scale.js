function scaleUserPicture() {
    const scaleUpBtn = document.querySelector('.resize__control--plus');
    const scaleDownBtn = document.querySelector('.resize__control--minus');
    const scaleValueInput = document.querySelector('.resize__control--value');
    const userImg = document.querySelector('.img-upload__preview');
    const SCALE_STEP = 25;
    const MIN_SCALE = 25;
    const MAX_SCALE = 100;

    let scaleValue = scaleValueInput.value;

    scaleUpBtn.addEventListener('click', () => {
        if(parseInt(scaleValue) < MAX_SCALE) {
            scaleValue = `${parseInt(scaleValue) + SCALE_STEP}%`;
            scaleValueInput.value = scaleValue;
            userImg.style.transform = `scale(${parseInt(scaleValue) / 100})`;
        }
    })
    
    scaleDownBtn.addEventListener('click', () => {
        if(parseInt(scaleValue) > MIN_SCALE) {
            scaleValue = `${parseInt(scaleValue) - SCALE_STEP}%`;
            document.querySelector('.resize__control--value').value = scaleValue;
            userImg.style.transform = `scale(${parseInt(scaleValue) / 100})`;
        }
    })
}

scaleUserPicture();

export default scaleUserPicture;



