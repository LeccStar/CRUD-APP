const form = document.querySelector("#formBudget")
const currentBudget = document.querySelector("#currentBudget")

const sendForm = (e) => {
    const {budget, currency } = e.target
    console.log(budget.value, currency.value)
    e.preventDefault()
    if (budget.value==0||budget.value.length == 0) alert("No puedes tener presupuesto 0 🥲");
    const arrayBudget = [budget.value, currency.value];
    localStorage.setItem("budget",JSON.stringify(arrayBudget))
    setBudget()
    form.reset()
}


form.addEventListener("submit",sendForm);

const setBudget = () => {
    currentBudget.innerHTML = "El presupuesto mensual es: "
    arrayBudget = JSON.parse(localStorage.getItem("budget"))
    if (arrayBudget === null) {
        arrayBudget = []
    } else {
        currentBudget.innerHTML = `<p class="textoDeForm" id="currentBudget">El presupuesto mensual es: ${arrayBudget[0]} ${arrayBudget[1]}</p>
        `
    }
}

document.addEventListener("DOMContentLoaded",setBudget)