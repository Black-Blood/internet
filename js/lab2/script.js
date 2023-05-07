import task1 from "./task1.js"
import task2 from "./task2.js"

const
    btnStartTask1 = document.getElementById("btnStartTask1"),
    btnStartTest = document.getElementById("btnStartTest")

btnStartTask1.addEventListener("click", task1)
btnStartTest.addEventListener("click", task2)



