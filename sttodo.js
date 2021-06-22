console.log("Script Loaded!!")
var todoInputBox = document.getElementById("todo-input-box");
var nameHolder = document.getElementById("name-holder");
var todoForm = document.getElementById("todo-form")
var btnAddTodo = document.getElementById("btn-add-todo")
var todoList = document.getElementById("todo-list")
todoForm.addEventListener("submit", function(e) {
    e.preventDefault();
})

todoInputBox.addEventListener("input", function(eventObj) {
    console.log(todoInputBox.value);
})
var todoFromStorage = localStorage.getItem("todo-list") === null ? []:JSON.parse(localStorage.getItem("todo-list"));
for(var i=0;i<todoFromStorage.length;i++){
    renderTodoCard(todoFromStorage[i].message,todoFromStorage[i].date);
}

function renderTodoCard(message,time){
    // <div class="todo-item">
    //     <div>
    //         <h3>Buy Mangoes</h3>
    //         <p>11-06-2021 20:05:23</p>
    //     </div>
    //     <i class="fas fa-trash"></i>
    // </div>
    var card = document.createElement("div") //<div></div>
    card.className = "todo-item"; //<div class="todo-item"></div>

    var todoMetaWrapper = document.createElement("div");
    var heading = document.createElement("h3");
    heading.innerHTML = message;
    var paragraph = document.createElement("p");
    paragraph.innerHTML = time;
    todoMetaWrapper.appendChild(heading);
    todoMetaWrapper.appendChild(paragraph);
    card.appendChild(todoMetaWrapper);

    
    var deleteIcon = document.createElement("i");
    deleteIcon.className = "fas fa-trash";
    deleteIcon.addEventListener("click", function() {
        card.remove();
    })
    card.appendChild(deleteIcon);

    todoList.prepend(card);
    todoInputBox.value = "";
    
}
btnAddTodo.addEventListener("click", function() {
    if(todoInputBox.value === "") {
        alert("Please enter the TODO item");
        return;
    }
    var currentDate = new Date();
    var time = currentDate.getDate() + "-" + (parseInt(currentDate.getMonth()) + 1) + "-" + currentDate.getFullYear() + " " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
    var mArr = localStorage.getItem("todo-list") === null ? []:JSON.parse(localStorage.getItem("todo-list"));
    mArr.push({
        message:todoInputBox.value,
        date:time,
    })
    localStorage.setItem("todo-list",JSON.stringify(mArr));
    renderTodoCard(todoInputBox.value,time);
    }) 
