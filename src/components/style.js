function dropdownAndSlider() {
    dropdown();
    initializeSlider();
}

function dropdown() {
    for (const option of document.querySelectorAll(".custom-option")) {
        option.addEventListener('click', function() {
            if (!this.classList.contains('selected')) {
                this.parentNode.querySelector('.custom-option.selected').classList.remove('selected');
                this.classList.add('selected');
                this.closest('.custom-select').querySelector('.custom-select__trigger span').textContent = this.textContent;
                
            }
        })
    }
    
    for (const dropdown of document.querySelectorAll(".custom-select-wrapper")) {
        dropdown.addEventListener('click', function() {
            this.querySelector('.custom-select').classList.toggle('open');
            this.querySelector('.custom-select__trigger').classList.toggle("select-arrow-active");
        })
    }
    
    window.addEventListener('click', function(e) {
        for (const select of document.querySelectorAll('.custom-select')) {
            if (!select.contains(e.target)) {
                select.classList.remove('open');
                select.querySelector('.custom-select__trigger').classList.remove("select-arrow-active");
            }
        }
    });
}

function initializeSlider() {
    let slider = document.getElementById("speed");

    slider.oninput = function() {
        getSliderValue();
    }
}

function getSliderValue() {
    let slider = document.getElementById("speed");
    let output = document.getElementById("speed-setting");
    
    if (slider.value < 10) {
        output.innerHTML = "Giannis Freethrow"; 
    } else if (slider.value < 30) {
        output.innerHTML = "Slow"; 
    } else if (slider.value < 50) {
        output.innerHTML = "Medium"; 
    } else if (slider.value < 70) {
        output.innerHTML = "Fast"; 
    } else {
        output.innerHTML = "Very Fast"; 
    }
}

export default dropdownAndSlider;
