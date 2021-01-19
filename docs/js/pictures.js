

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

