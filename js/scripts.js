//=========================================================================================
//---------remove single item-------------------------------------------
//=========================================================================================
const list = document.querySelector('.task-list')

list.addEventListener('click', removeItem)
 
function removeItem(e) {
    if(e.target.classList.contains('remove-icon')) {
        e.target.parentElement.remove()
        //remove from LS as well!
        //for some STRANGE REASON there was WHITE-SPACE inserted before the text content, 
        //so it had to be trimmed - otherwise it would not === task
        removeTaskFromLS(e.target.parentElement.textContent.trim())
    }

    function removeTaskFromLS(singleTask){
        
        console.log(singleTask);
        tasks = JSON.parse(localStorage.getItem('tasks'))
        
        
        tasks.forEach((task, index) => {
            console.log(task);
            if(singleTask === task){
                tasks.splice(index, 1)
            }
        })
        //iterate the tasks-array, if the singleTask(e.target,parentElement) 
        //has the same text content as the currently iterated task in array,
        //perform splice on it using its index (cut out just this one)
        


        //and in the end send the rest of the tasks back to the LS:
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }
}







//=========================================================================================
//---------ADD NEW ITEM TO LIST-------------------------------------------
//=========================================================================================
const addBtn = document.querySelector('.input-btn')
const inputField = document.querySelector('.input-field')


addBtn.addEventListener('click', addNewItem)

function addNewItem(e) {
   //check for the length of the list and alert the user if he added too many items
    const container = document.querySelector('.outer-container')
    const containerHeight = (parseInt(getComputedStyle(container).height))
    
    //no submit action(page reload)
    e.preventDefault()

    if(containerHeight > 1000 && containerHeight < 1050) {
        
        //modal.classList.add('modal-on')  - po staremu, statycznie
        modalWindow.openModal(modalOptions = {
            title:`No no no no noooo, wait, stop!`,
            content:`It is highly recommended that you complete some of the current tasks before commiting to new ones, don't you think?`
        })
    }
    else{ //default behavior - add item
       
        //but do not add anything if input value was empty
        if(inputField.value === ''){
            modalWindow.openModal(modalOptions = {
                title:`Hey there, no cheating!`,
                content:`Empty task is not a task, you can't count doing nothing for something`
            })
        }else
        {
        let newItem = document.createElement('li')
        newItem.className = 'single-task'
        newItem.innerHTML = ` ${inputField.value}
        <a class="remove-icon"><svg  class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"/></svg></a>`
        list.appendChild(newItem)
        

        //-------add to local storage as well and take from it---------------
        storeTaskInLocalStorage(inputField.value)
    }
    }       
}
document.addEventListener('DOMContentLoaded', getTasksFromLocalStorage)

function storeTaskInLocalStorage(task){
    let tasks
    if(localStorage.getItem('tasks') === null){
        tasks = []
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.push(task)

    localStorage.setItem('tasks', JSON.stringify(tasks))
}
function getTasksFromLocalStorage() {
    let tasks
    if(localStorage.getItem('tasks') === null){
        tasks = []
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.forEach((task) => {
        let newItem = document.createElement('li')
        newItem.className = 'single-task'
        newItem.innerHTML = ` ${task}
        <a class="remove-icon"><svg  class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"/></svg></a>`
        list.appendChild(newItem)

    })
}








//=========================================================================================
// -----------clear button------------------------------------------------
//=========================================================================================
document.querySelector('.clear-btn').addEventListener('click', clearAll)


function clearAll() {
    //let listItems = document.querySelectorAll('.single-task')
    // listItems.forEach((item) =>{
    //     if(item.classList.contains('single-task')){
    //         item.remove()
    //     }
    
    // }
    //faster way to clear all -while there is 'true' for first child on the list - keep removing it
    const taskList = document.querySelector('.task-list')
    while(taskList.firstChild){
        taskList.firstChild.remove()
        
    }
    //remove all from LS as well:
    localStorage.removeItem('tasks')
    }
    

    








//=========================================================================================
//--------------modal-----------------------------
//=========================================================================================

// const modal = document.querySelector('.modal-overlay')

// document.addEventListener('click', closeModal)

// function closeModal(e) {
//     if(e.target.classList.contains('modal-close')) {
//         modal.classList.remove('modal-on')
//     }
// }










//=========================================================================================
//---------------------------------------------filter tasks--------------------------------
//=========================================================================================
const filter = document.querySelector('.filter-field')
filter.addEventListener('keyup', filterTasks)

function filterTasks(e){
    const text = e.target.value.toLowerCase()
    console.log(text);
    document.querySelectorAll('.single-task').forEach((task) =>{
        const item = task.firstChild.textContent.toLowerCase()
        //index of compares the text from filter with list text. if there is no match, the value is -1
        //if there is a match:
        if(item.indexOf(text) != -1){
            task.style.display = 'grid'
        }
        //if there is no match:
        else{
            task.style.display = 'none'
        }
    })
}









//=========================================================================================
//--------------------------GLOBAAL MODAL---------------------------------------------
//=========================================================================================
const modalWindow = {
    init() {
        document.addEventListener('click', (e) => {
            if(e.target.classList.contains('modal-close')) {
                //enable back the scrolling on body
                document.body.style.overflow = 'auto'
                document.body.style.height = 'auto'
                
                const modalOverlay = document.querySelector('.modal-overlay')
                //animate the modal closing
                modalOverlay.classList.remove('modal-animation')
                setTimeout(() => {
                    modalOverlay.remove()
                },2500)
                // 
            }
        })
    },
    getHTMLTemplate(modalOptions) {
        return `
        <div class="modal-overlay">
            <div class="modal-window">
            <div class="modal-title-bar">
                <span class="modal-title">${modalOptions.title}</span>
                <button class="modal-close material-icons">close</button>
                
            </div>
        
            <div class="modal-content">
            ${modalOptions.content}
            </div>
            </div>
        </div>
        `
    },
    openModal(modalOptions = {}){
        //disable scrolling on modal open
        document.body.style.overflow = 'hidden'
        document.body.style.height = '95vh'
        
        modalOptions = Object.assign({
            title:`modal title`,
            content:`modal content` 
        },modalOptions)
        const modalTemplate = this.getHTMLTemplate(modalOptions)
        document.body.insertAdjacentHTML('afterbegin', modalTemplate)
        //brilliant way to animate the opening of modal - add a class after just 10ms
        setTimeout(() => {
            const animodal = document.querySelector('.modal-overlay')
            animodal.classList.add('modal-animation')
        },10)
        
    }
}

//iportant for the close button to work! 
document.addEventListener('DOMContentLoaded', () => {modalWindow.init()})
