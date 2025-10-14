const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const totalTask = document.getElementById("total-task");
const completedTask = document.getElementById("completed-task");
const themeBtn = document.getElementById("theme-btn");
const icon = document.getElementById("icon");


function addTask(){
    if(inputBox.value === ""){
        alert("You Must Write Something");
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);

        let iconDiv = document.createElement("div");

        let span1 = document.createElement("span");
        span1.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>';
        iconDiv.appendChild(span1);
        span1.classList.add("edit");

        let span2 = document.createElement("span");
        span2.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
        iconDiv.appendChild(span2)
        span2.classList.add("remove");

        li.appendChild(iconDiv)
        


        taskCount(); 
        saveData();

    }
    inputBox.value = "";
    saveData();

}

// listContainer.addEventListener("click", function(e){
//     if(e.target.tagName === "LI"){
//         e.target.classList.toggle("checked");
//     }
//     taskCount();
// }, false);

listContainer.addEventListener("click", function(e){
    const li = e.target.closest("li"); // jo li click hua
    if(!li) return;

    if(e.target.closest(".edit")){ // edit button
        let newText = prompt("Enter new text", li.firstChild.textContent);
        if(newText) li.firstChild.textContent = newText;
    } 
    else if(e.target.closest(".remove")){ // delete button
        li.remove();
    } 
    else if(e.target.tagName === "LI"){ // checkbox toggle
        li.classList.toggle("checked");
    }

    taskCount();
    saveData(); // changes save kar do
});


function taskCount(){
    const total = listContainer.querySelectorAll("li").length;
    const completed = listContainer.querySelectorAll("li.checked").length;

    totalTask.textContent = total;
    completedTask.textContent = completed;
    
}

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}

function loadData(){
    listContainer.innerHTML = localStorage.getItem("data") || "";
    taskCount();
}
loadData();

function toggleTheme(){
    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
    } else{
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
    }
}


