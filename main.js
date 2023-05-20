let input = document.querySelector(".input")
let submit = document.querySelector(".add")
let tasks = document.querySelector(".tasks")



let arrayOftasks = [] ;


// trigger Get Data  From  Local Storage function
getDataFromLocalStorage()

// Check if  task  in local storage
if (localStorage.getItem("task")) {
    arrayOftasks =  JSON.parse(localStorage.getItem("task")) 
}

submit.addEventListener("click", function() {
    if (input.value !== "" ) {
        addTaskToArray(input.value) // Add task to array of tasks  
        input.value = "" ;          // Empty input field
    }
})



tasks.addEventListener("click", (e) => {
    if(e.target.classList.contains("del")){
        // delete from local storage
        deleteTaskWith(e.target.parentElement.getAttribute("data-id"))
        
        // remove element from page
        e.target.parentElement.remove()
    }

    if(e.target.classList.contains("task")) {
        // toggle Completed For the task 
        toggleStatusWith(e.target.getAttribute("data-id"));
        // toggle Done Class
        e.target.classList.toggle("done")
       }

    
})

function addTaskToArray(taskText) {
   // Task Data

   const task = {
    id : Date.now(),
    title : taskText , 
    completed : false,
   }

   // push task to array of tasks
   arrayOftasks.push(task)
   addElementToPageForm(arrayOftasks);

   // add task to localStorage

   addDataToLocalStorageForm(arrayOftasks)
}

function addElementToPageForm(arrayOftasks) {  

    // check tasksDiv Empty 
    tasks.innerHTML = ""; 



    arrayOftasks.forEach((task) => {



        // create main Div
        let div = document.createElement("div");
        div.className = "task";
        div.setAttribute("data-id" , task.id);
        div.appendChild(document.createTextNode(task.title));

        // check if task is Done
         if (task.completed === true) {
            div.className = "task done";
         }

        // create delete button

        let span = document.createElement("span");
        span.className = "del";
        span.appendChild(document.createTextNode("delete"));
        div.appendChild(span);
        //add task Div to tasks container
        tasks.appendChild(div)

    })

 };


function addDataToLocalStorageForm(arrayOftasks) {
    localStorage.setItem("task" , JSON.stringify(arrayOftasks) )
 }


 function getDataFromLocalStorage() {
    let data = localStorage.getItem("task");
    if (data) {
        let tasks = JSON.parse(data)
        addElementToPageForm(tasks);
        
 }
}


function deleteTaskWith(taskId) {

   arrayOftasks = arrayOftasks.filter((task) => task.id != taskId);
   addDataToLocalStorageForm(arrayOftasks)
 }


 function toggleStatusWith (taskId) {

    for (let i = 0 ; i < arrayOftasks.length; i++) {
        console.log(`${arrayOftasks[i].id}`)

        if (arrayOftasks[i].id == taskId ) {
            arrayOftasks[i].completed == false ? arrayOftasks[i].completed = true  : arrayOftasks[i].completed = false;
        }
    }
    addDataToLocalStorageForm(arrayOftasks)

}