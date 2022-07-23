const form = document.querySelector("#formBudget")
const currentBudget = document.querySelector("#currentBudget")
const formExpenses = document.querySelector("#formExpenses")
const currentExpenses = document.querySelector("#currentExpenses")

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

const sendForm = (e) => {
    const {budget, currency } = e.target
    e.preventDefault()
    const arrayBudget = [budget.value, currency.value];
    if (budget.value==0||budget.value.length == 0) alert("No puedes tener presupuesto 0 🥲")
    else{
        localStorage.setItem("budget",JSON.stringify(arrayBudget))
        setBudget()
        form.reset()
    }
}

form.addEventListener("submit",sendForm);
let arrayExpenses = [];

const sendExpenses = (e) => {
    const {expenses, value } = e.target
    e.preventDefault()
    if (expenses.value==0||expenses.value.length == 0) alert("No pudiste haber gastado 0 🧐")
    else{
        const item = {
            expenses: expenses.value,
            value: value.value
        }
        arrayExpenses.push(item)
        localStorage.setItem("expenses",JSON.stringify(arrayExpenses))
        setExpenses()
        formExpenses.reset()
    }
}

formExpenses.addEventListener("submit",sendExpenses);

const setExpenses = () => {
    currentExpenses.innerHTML = ""
    arrayExpenses = JSON.parse(localStorage.getItem("expenses"))
    if (arrayExpenses === null) {
        arrayExpenses = []
    } else {
        arrayExpenses.forEach(element => {
            currentExpenses.innerHTML += `
            <p>${element.expenses} ${arrayBudget[1]}</p>
            <p>${element.value}</p>
            <p>🖋️</p>
            <p>❌</p>` 
        });
    }
}

document.addEventListener("DOMContentLoaded",setExpenses)