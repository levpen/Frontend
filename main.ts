let apiFrom: HTMLSelectElement = document.getElementById('apiFrom') as HTMLSelectElement
let apiTo: HTMLSelectElement = document.getElementById('apiTo') as HTMLSelectElement

fetch(`https://open.er-api.com/v6/latest/RUB`)
.then(res => res.json())
.then((data) => {
    for(let i in data.rates){
        apiFrom.innerHTML += `<option> ${i} </option>`
        apiTo.innerHTML += `<option> ${i} </option>`
    }
});

const apiForm = document.getElementById('apiForm') as HTMLFormElement
const apiResult = document.getElementById('apiResult') as HTMLDivElement

apiForm.addEventListener('submit', addPost);
function addPost(e) {
    e.preventDefault();
    const amount: number = Number((document.getElementById('apiAmount') as HTMLInputElement).value);
    const fromCurr: string = apiFrom.value;
    const toCurr: string = apiTo.value;
    fetch(`https://open.er-api.com/v6/latest/${fromCurr}`)
    .then((res) => res.json())
    .then((data) => {
        let convertedAmount = amount;
        for (let i in data.rates) {
            if(i === toCurr){
                convertedAmount *= data.rates[i];
                console.log(data.rates[i]);
            }
        }
        (apiResult as HTMLElement).innerHTML = `<p>${amount} ${fromCurr} = ${convertedAmount} ${toCurr}</p>`
    });
}