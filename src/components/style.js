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

                let description = document.getElementById("description_hud");
                switch(this.textContent) {
                    case "Dijkstra's":
                        description.innerHTML = "Dijkstra's is <strong> weighted </strong> and <strong> guarantees </strong> the shortest path!";
                        break;
                    case "A*":
                        description.innerHTML = "A* Search is <strong> weighted </strong> and <strong> guarantees </strong> the shortest path!";
                        break;
                    case "Breadth First Search":
                        description.innerHTML = "Breadth First Search is <strong> unweighted </strong> and <strong> guarantees </strong> the shortest path!";
                        break;
                    case "Depth First Search":
                        description.innerHTML = "Depth First Search is <strong> unweighted </strong> and <strong> does not guarantee </strong> the shortest path!";
                        break;
                    default:
                        break;
                }
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
    
    if (slider.value < 20) {
        output.innerHTML = "Very fast"; 
    } else if (slider.value < 50) {
        output.innerHTML = "Fast"; 
    } else if (slider.value < 100) {
        output.innerHTML = "Medium"; 
    } else if (slider.value < 180) {
        output.innerHTML = "Slow"; 
    } else {
        output.innerHTML = "Very Slow"; 
    }
}

export default dropdownAndSlider;
