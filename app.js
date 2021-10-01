document.addEventListener('DOMContentLoaded', () => {
    let btn = document.getElementById('btn')
    let ul = document.getElementById('wrapperTasks')
    let todoList = []
    let input = document.getElementById("input")

    if(localStorage.getItem('todoList')) {
        todoList = JSON.parse(localStorage.getItem('todoList'))
        displayMessanges()
    }

    btn.addEventListener('click', () => {
        if(input.value === "") {
            alert("Create task")
        } else {
            let value = document.getElementById("input").value

            let temp = {
                todo: value,
                completed: false,
            }
            todoList.push(temp)
            displayMessanges()
            localStorage.setItem('todoList', JSON.stringify(todoList))
            input.value = ""
        }
    }) 

    function displayMessanges() {
        let displayMessange = ""
        if(todoList.length === 0) {
            ul.innerHTML = ""
        }
        todoList.forEach((item, index) => {
            displayMessange += `
            <li id = "${index}">
                <input type = "checkbox" name = "checkbox" id = "item_${index}">
                <label for = "item_${index}" id = "${index}" class="label">${item.todo}</label>
            </li>
            `
            ul.innerHTML = displayMessange
        })
    }

    ul.addEventListener('change', function(e) {
        let inputId = e.target.getAttribute('id')
        let valueLabel = ul.querySelector('[for='+ inputId +']').innerHTML
        
        todoList.forEach(function(item) {
            if(item.todo === valueLabel) {
                item.completed = !item.completed
                localStorage.setItem('todo', JSON.stringify(todoList))
            } 

            
        })
    })

    ul.addEventListener('contextmenu', (event) => {
        event.preventDefault()
        todoList.forEach(function(item, index) {
            if(item.todo === event.target.innerHTML) {
                if(event.ctrlKey) {
                    todoList.splice(index, 1)

                }
                displayMessanges()
                localStorage.setItem('todoList', JSON.stringify(todoList))
            } 
        })
    })
})



