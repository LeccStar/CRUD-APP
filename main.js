const form = document.querySelector("#formBudget")
const currentBudget = document.querySelector("#currentBudget")
const formExpenses = document.querySelector("#formExpenses")
const currentExpenses = document.querySelector("#currentExpenses")
const resultados = document.querySelector("#resultados")

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
        setExpenses()
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
    let totalSum = 0
    currentExpenses.innerHTML = ""
    arrayExpenses = JSON.parse(localStorage.getItem("expenses"))
    console.log(arrayExpenses)
    if (arrayExpenses === null) {
        arrayExpenses = []
    } else {
        arrayExpenses.forEach(element => {
            if (arrayBudget[1]== undefined) {
                alert("Falta meter un presupuesto. 🧐")
                arrayBudget[1] = ""
            }
            currentExpenses.innerHTML += `<div class="styleTable2">
            <p>${element.expenses} ${arrayBudget[1]}</p>
            <p>${element.value}</p>
            <p>🖋️</p>
            <p>❌</p>
            </div>` 
            element.expenses = (+element.expenses)
            totalSum = totalSum + element.expenses
        });
        let residue = (+arrayBudget[0])-totalSum
        resultados.innerHTML = `<h4>Gasto: ${totalSum} ${arrayBudget[1]} </h4>
        <h4>Presupuesto restante: ${residue} ${arrayBudget[1]} </h4>`
         
    }
    
}

document.addEventListener("DOMContentLoaded",setExpenses)

const deleteExpense = (gasto) => {
    let indexToDelate
    arrayExpenses.forEach((element, index) => {
        if (`${element.expenses} ${arrayBudget[1]}` === gasto ){
            indexToDelate = index
        }
    })
    arrayExpenses.splice(indexToDelate,1)
    localStorage.setItem("expenses",JSON.stringify(arrayExpenses))
}
const editExpense = (gasto) => {
    let indexArray = arrayExpenses.findIndex((element)=>
    `${element.expenses} ${arrayBudget[1]}` === gasto
    )
    formExpenses.innerHTML = `<label class="label textoDeForm" for="expenses">Ahora, cada que vayas haciendo gastos, introduce el importe
    aquí para poder ir llevando un control mensual. 🤓
    También define qué tan necesario era hacer ese gasto.
</label>
<input class="styleColor edits" type="number" name="expenses">
<select class="styleColor edits" name="value" id="">
    <option value="Imprescindible 🥵">Imprescindible 🥵</option>
    <option value="Útil 🤗">Útil 🤗</option>
    <option value="Un lujo 😳">Un lujo 😳</option>
    <option value="Improvisto ☹️">Improvisto ☹️</option>
</select>
<button class="styleColor edits">Actualizar Gasto</button>`
    formExpenses.removeEventListener("submit",sendExpenses)
    const updateForm = (e) => {
        const {expenses, value } = e.target
        e.preventDefault()
        if (expenses.value==0||expenses.value.length == 0) alert("No pudiste haber gastado 0 🧐")
        else{
            const item = {
                expenses: expenses.value,
                value: value.value
            }
            arrayExpenses[indexArray].expenses=(item.expenses)
            arrayExpenses[indexArray].value=(item.value)
            localStorage.setItem("expenses",JSON.stringify(arrayExpenses))
            setExpenses()
            formExpenses.reset()
            location.reload(true)
        }
    }
    formExpenses.addEventListener("submit", updateForm)
}



currentExpenses.addEventListener("click", (e) => {
    if (e.target.innerHTML==="❌") {
        deleteExpense(e.path[1].childNodes[1].innerHTML)
        setExpenses()
    }
    if (e.target.innerHTML==="🖋️") {
        editExpense(e.path[1].childNodes[1].innerHTML)
    }
})
