window.logout = function() {
	fetch('/~/Satsuma/logout', { method: 'POST'});
	alert('Logged Out!');
	location.href = '/~/Satsuma/index';
}

function load() {
	const $name = document.getElementById('name');
	if(playername && $name) $name.value = playername;	
}

const $name = document.getElementById('name');

async function signup() {
	
	const username = document.getElementById('signup_username').value;
	const password = document.getElementById('signup_password').value;
	const email = document.getElementById('signup_email').value;
	if(!username) return alert('Please enter a name!');
	if(!password) return alert('Please enter a password!');
	if(!email) return alert('Please enter your email!');
	if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) return alert("You have entered an invalid email address!");
 
	const path = '/~/Satsuma/signup';
	const method = 'POST';
	const headers = { 'Content-Type': 'application/json' }
	const body = JSON.stringify({ username, password, email });
	const redirect = 'error';
	
	try {
		await fetch(path, { method, headers, body, redirect });
		
		playername = username;
		//localStorage.setItem('playername', playername);
		alert('signed up successfully!');
		
		location.href = '/~/Satsuma/index'
		
	} catch(ex) {
		alert('Name already taken, please choose another one.')
	}
}

async function login() {
	const username = document.getElementById('login_username').value;
	const password = document.getElementById('login_password').value;
	if(!username) return alert('Please enter a name!');
	if(!password) return alert('Please enter a password!');
	
	const path = '/~/Satsuma/login';
	const method = 'POST';
	const headers = { 'Content-Type': 'application/json' }
	const body = JSON.stringify({ username, password });
	const redirect = 'error';
	const resp = await fetch(path, { method, headers, body, redirect });
	const ans = await resp.json();
	if(ans.error) return alert(ans.error);
	playername = username;
    localStorage.setItem('playername', playername);
	location.href = '/~/Satsuma/index';
}

// for groups
async function getgroups() {
    const path = '/~/Satsuma/open/groups?all=true';
	const method = 'GET'
	const resp = await fetch(path, { method });
	const groups = await resp.json();
	 
	const $groups = document.getElementById('home');
	if(!groups.length) {
	//	$groups.innerHTML = 'No groups';
		return;
	}
	alert('hi');
    //alert(JSON.stringify(groups));
    //$groups.innerHTML = JSON.stringify(groups);
    
  //  var host_groups = JSON.stringify(groups[groups.length-1]["data"]["name"]["host_groups"]);
   // var in_groups = groups[groups.length-1]["data"]["name"]["in_groups"];


   // $groups.innerHTML = in_groups.map((groups, i) => `<div>${i + 1}. <p>${in_groups[i]}</p></div>`).join('\n');
	
}

async function addgroup(group_name) {
	
	const path = '/~/Satsume/open/groups';
	const path1 = '/~/Satsuma/open/groups?all=true'
	const method = 'POST';
	const method1 = 'GET'
	const headers = { 'Content-Type': 'application/json' }
	//groups = await fetch(path1, { method1 } );
	//alert(JSON.parse(groups));
	const body = JSON.stringify({ $username : {"in_groups":["careers"], "host_groups":["civics"]}});
	await fetch(path, { method, headers, body });
	location.reload();
}

// for indivgroup

function loadIndivGroup() {
	document.getElementById("task-tab").style.display = "block";
	document.getElementById("tasks").style.display = "block";
	document.getElementById("leaderboard-tab").style.display = "none";
	document.getElementById("leaderboard").style.display = "none";
}

document.getElementById("task-tab").addEventListener("click", function() {
	document.getElementById("task-tab").style.display = "none";
	document.getElementById("tasks").style.display = "none";
	document.getElementById("leaderboard-tab").style.display = "block";
	document.getElementById("leaderboard").style.display = "block";
});

document.getElementById("leaderboard-tab").addEventListener("click", function() {
	document.getElementById("task-tab").style.display = "block";
	document.getElementById("tasks").style.display = "block";
	document.getElementById("leaderboard-tab").style.display = "none";
	document.getElementById("leaderboard").style.display = "none";
});


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
	let taskPrize = document.getElementById("taskPrize");
	
	newTask.name = taskName.value;
	newTask.due = taskDate.value;
	
	if(taskPrize.value != ""){
		newTask.reward = taskPrize.value;
	}
	
	taskName.value = "";
	taskDate.value = "";
	taskPrize.value = "";
	
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
		let tdReward = document.createElement("td");
		if(aTask.reward != undefined) {
			tdReward.innerText = aTask.reward;
		} else {
			tdReward.innerText = "";
		}
		tr.appendChild(tdName);
		tr.appendChild(tdDue);
		tr.appendChild(tdReward);
		
		document.getElementById("task-table").appendChild(tr);
		localStorage.setItem("allTasks", JSON.stringify(task_list));
	})
}