const url = "http://www.json-generator.com/api/json/get/bVTglUMROW?indent=2";
let data;
function getData() {
    fetch(url)
    .then(function(response) {
        return response.json();        
    })
    .then(resData => {
        data = resData;
        render(data);
        console.log(data);
    })
    
}
getData();

function render(data) {
    let price = document.querySelector(".price__rows-container");
    price.innerHTML = '';
    data.forEach(item => {
        const {name, gender, age, email, balance} = item;
        price.innerHTML += `
            <div class="price__row">
                <div class="price__column --name">${name}</div>
                <div class="price__column --gender">${gender}</div>
                <div class="price__column --age">${age}</div>
                <div class="price__column --email">${email}</div>
                <div class="price__column --balance">${balance}</div>
            </div>
        `
    });
}                                                   

const priceColumn = document.querySelectorAll(".price__column");
for(let i = 0; i < priceColumn.length; i ++) {
    priceColumn[i].addEventListener("click", sortProps);
}
function sortProps() {
    const buttons = document.querySelectorAll('.--header .price__column');
    buttons.forEach(button => {
        if (button !== this){
            button.dataset.sortType = 'asc';
        }
    })
    const sortType = this.dataset.sortType;    
    let prop = this.innerText.toLowerCase();
    if (sortType === 'asc') {
        const newData = data.sort(function(a, b){
            if(a[prop] > b[prop]) {
                return 1;
            }
            if(a[prop] < b[prop]) {
                return -1;
            }
            return 0;
        })
        data = newData;        
    }    
    else if (sortType === "desc") {
        data = data.reverse();
    }
    this.dataset.sortType = "desc";
    render(data);    
}

const input = document.getElementById("input_filter");
input.addEventListener("keyup", filterProps);

function filterProps() {
    let result = data.filter(item => {
        return item.name.toLowerCase().startsWith(input.value.toLowerCase());
    });
    render(result);
}


const inputsNumber = document.querySelectorAll(".input_number");

for( let i = 0; i < inputsNumber.length; i ++) {
    inputsNumber[i].addEventListener('keyup', filterMinMaxValue);
}
function filterMinMaxValue() {
    let minValue = parseInt(inputsNumber[0].value);
    let maxValue = parseInt(inputsNumber[1].value);
    let result = data.filter(item => {
        let balance = parseInt(item.balance.replace(/[$,]/g, ''));
        
        if(!minValue && (balance < maxValue)) {                     
            return true;
        }
        else if (!maxValue && (balance > minValue)) {            
            return true;
        }
        if(minValue && maxValue && (minValue < balance && balance < maxValue)) {            
            return true;            
        }        
    })    
    render(result);
}
