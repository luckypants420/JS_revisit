document.addEventListener('DOMContentLoaded', () => {
    console.log("App loaded")
})
const form = document.getElementById('new-form')
const input = document.getElementById('new-input')
const list = document.getElementById('list')

let tasks = []

//takes the state and paints the dom (renders the list)
function render() {
    list.innerHTML = ''; //clears what ever was old

    tasks.forEach((text, i) => {
        const li = document.createElement('li')

        //create a label
        const span = document.createElement('span')
        span.textContent = text

        //delete button
        const dltBtn = document.createElement('button')
        dltBtn.textContent = '✖'
        dltBtn.setAttribute('data-index', i) // so that it rememebrs which task this is 
        dltBtn.ariaLabel = 'Delete Task'
        li.appendChild(span)
        li.appendChild(dltBtn)
        list.appendChild(li)
    });
}

//a listener for all buttons the current and any future ones i might make 
list.addEventListener('click', (e) => {
    const target = e.target;
    if (target.tagName === 'BUTTON' && target.hasAttribute('data-index')) {
        const idx = Number(target.getAttribute('data-index'))
        tasks.splice(idx, 1) //remove 1 item at idx
        render()
    }
    //this is event delegation 
    // so that i dont create a new button for each item on
    //  the list instead its for the whole ul
})


//handle the form submission
form.addEventListener('submit', (e) => {
    e.preventDefault(); //so that the page doesnt reload every time i submit 
    const text = input.value.trim(); //read the input from user and tidy it with trim 
    if (!text) { return } //ignores empty strings
    tasks.push(text) //takes the input and pushes it to the array tasks
    input.value = '' //empties the input bar for the next input
    render()
    input.focus()//helps with quick typing the next one
    console.log("added an input to tasks")

})

/*
lets gooo with a long comment 
*/