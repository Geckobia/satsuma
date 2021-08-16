/*

// adding a task
let add_task = document.getElementById("add-task");
let task_form = document.getElementById("task-form");
let close = document.getElementById("close");

let task_list = [];

task_form.addEventListener("submit", (e)=> {
	addTask(e);	
});

function addTask(e) {
	e.preventDefault();
	
	let newTask = {};
	
	let aTask = document.querySelector(".aTask");
	
	let taskName = document.getElementById("taskName");
	let taskDate = document.getElementById("taskDate");

	newTask.name = taskName.value;
	newTask.due = taskDate.value;
	
	taskName.value = "";
	taskDate.value = "";

	task_list.push(newTask);
	postTask();
	close.click();
	console.log(task_list);
}

function postTask() {
	let allTasks = Array.from(document.querySelectorAll(".taskStuff"));
	
	if(allTasks.length > 0) {
		allTasks.forEach(aTask =>{
			aTask.remove();
		})
	}
	
	task_list.map(aTask =>{
		let tr = document.createElement("tr");
		tr.classList = "taskStuff";
		let tdName = document.createElement("td");
		tdName.innerText = aTask.name;
		let tdDue = document.createElement("td");
		tdDue.innerText = aTask.due;
		tr.appendChild(tdName);
		tr.appendChild(tdDue);
		
		document.getElementById("task-table").appendChild(tr);
		localStorage.setItem("allTasks", JSON.stringify(task_list));
	})
}

*/