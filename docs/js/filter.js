function filterUserPicture() {
    const userImg = document.getElementById('user-picture');
    const filterBtns = document.querySelectorAll('.effects__radio');
    const sliderContainer = document.querySelector('.img-upload__scale');
    const sliderInput = sliderContainer.querySelector('.scale__value');
    const slider = sliderContainer.querySelector('.scale__line');
    const sliderPin = sliderContainer.querySelector('.scale__pin');  
    const sliderLevel = sliderContainer.querySelector('.scale__level');

    // Смена фильтров загруженной фотографии

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            sliderInput.value = 100;
            setFilters();
            let classValue = null;
            for (let i = 0; i < filterBtns.length; i++) {
                classValue = filterBtns[i].value;
                if (filterBtns[i].checked) {
                    userImg.classList.add(`effects__preview--${classValue}`);
                } else {
                    userImg.classList.remove(`effects__preview--${classValue}`);
                }
            }
            
            if(btn.value === 'none') {
                sliderContainer.classList.add('hidden');
            } else {
                sliderContainer.classList.remove('hidden');
                sliderPin.style.left = `${sliderLevel.offsetWidth}px`;   
            }
        })
    })

    // Перемещение ползунка слайдера

    sliderPin.addEventListener('mousedown', event => {

        // Координаты полосы слайдера

        const sliderLevelDefaultCoords = sliderLevel.getBoundingClientRect();
        const sliderLevelCoords = {};
        sliderLevelCoords.top = sliderLevelDefaultCoords.top + pageYOffset;
        sliderLevelCoords.left = sliderLevelDefaultCoords.left + pageXOffset;

        // Координаты ползунка слайдера
        
        const sliderPinDefaultCoords = sliderPin.getBoundingClientRect();
        const sliderPinCoords = {};
        sliderPinCoords.top = sliderPinDefaultCoords.top + pageYOffset;
        sliderPinCoords.left = sliderPinDefaultCoords.left + pageXOffset;

        let newLeftPosition = null;
        let right = sliderLevel.offsetWidth; //

        document.addEventListener('mousemove', onMouseMove)

        function onMouseMove(event) {
            newLeftPosition = event.pageX - sliderLevelCoords.left;
            if (newLeftPosition < 0) {
                newLeftPosition = 0;
            }
            if (newLeftPosition > right) {
                newLeftPosition = right;
            }
            sliderPin.style.left = `${newLeftPosition}px`;

            sliderInput.value = Math.floor(newLeftPosition / sliderLevel.offsetWidth * 100); //
            setFilters();
        
            document.addEventListener('mouseup', onMouseUp)
        }
        
        function onMouseUp() {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
            
            setFilters();
        }
    })

    // Эффекты фильтров

    function setFilters() {
        const value = sliderInput.value; 
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
}

filterUserPicture();

export default filterUserPicture;