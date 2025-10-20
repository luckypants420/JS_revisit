document.addEventListener('DOMContentLoaded', () => {
    console.log("App loaded")
})
const form = document.getElementById('new-form')
const input = document.getElementById('new-input')
const list = document.getElementById('list')

let tasks = [] // this hold an array of objects of the tasks

function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
}

//takes the state and paints the dom (renders the list)
function render() {
    list.innerHTML = ''; //clears what ever was old

    tasks.forEach(({ id, text, done }) => {
        const li = document.createElement('li')
        li.dataset.id = id

        const checkbox = document.createElement('input')
        checkbox.type = 'checkbox'
        checkbox.checked = done
        checkbox.ariaLabel = 'Toggle done'

        //create a label
        const span = document.createElement('span')
        span.textContent = text
        if (done) {
            span.style.textDecoration = 'line-through'
        }

        //delete button
        const dltBtn = document.createElement('button')
        dltBtn.textContent = '✖'
        dltBtn.className = 'delete'
        dltBtn.ariaLabel = 'Delete Task'

        li.appendChild(checkbox)
        li.appendChild(span)
        li.appendChild(dltBtn)
        list.appendChild(li)
    });
}

//a listener for all buttons the current and any future ones i might make 
list.addEventListener('click', (e) => {
    const target = e.target;
    const li = target.closest('li')
    if (!li) { return }
    const id = li.dataset.id


    if (target.tagName === 'BUTTON' && target.classList.contains('delete')) {
        tasks = tasks.filter(t => t.id !== id)
        render()
    }
    //this is event delegation 
    // so that i dont create a new button for each item on
    //  the list instead its for the whole ul
})


//listen to checkbox changes
list.addEventListener('change', (e) => {
    const target = e.target
    if (target.tagName === 'INPUT' && target.type === 'checkbox') {
        const li = target.closest('li')
        if (!li) return
        const id = li.dataset.id
        const t = tasks.find(t => t.id === id)
        if (!t) return
        t.done = target.checked //updates the state
        render()
        printObjects()

    }
})

//handle the form submission
form.addEventListener('submit', (e) => {
    e.preventDefault(); //so that the page doesnt reload every time i submit 
    const text = input.value.trim(); //read the input from user and tidy it with trim 
    if (!text) { return } //ignores empty strings
    tasks.push({ id: uid(), text, done: false }) //takes the input and pushes it to the array tasks
    input.value = '' //empties the input bar for the next input
    render()
    input.focus()//helps with quick typing the next one
    console.log("added an input to tasks")
    printObjects()

})


function printObjects() {
    let obj = tasks.map(value => {
        console.log(value)
    })
}
/*

lets gooo with a long comment 
*/