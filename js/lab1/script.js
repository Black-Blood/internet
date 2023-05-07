import task1 from "./task1.js"
import task2 from "./task2.js"

const
    btnStartTask1 = document.getElementById("btnStartTask1"),
    btnStartTask2 = document.getElementById("btnStartTask2")

btnStartTask1.addEventListener("click", task1)
btnStartTask2.addEventListener("click", task2)
