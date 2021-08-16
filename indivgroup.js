// for indivgroup

function loadIndivGroup() {
	document.getElementById("task-tab").style.display = "block";
	document.getElementById("leaderboard").style.display = "none";
	document.getElementById("leaderboard-tab").style.opacity = 0.5;
	document.getElementById("add-task").style.display = "none";
}

document.getElementById("leaderboard-tab").addEventListener("click", function() {
	document.getElementById("tasks").style.display = "none";
	document.getElementById("leaderboard").style.display = "block";
	document.getElementById("task-tab").style.opacity = 0.5;
	document.getElementById("leaderboard-tab").style.opacity = 1;
});

document.getElementById("task-tab").addEventListener("click", function() {
	document.getElementById("tasks").style.display = "block";
	document.getElementById("leaderboard").style.display = "none";
	document.getElementById("leaderboard-tab").style.opacity = 0.5;
	document.getElementById("task-tab").style.opacity = 1;
});

document.getElementById("add_task_b").addEventListener("click", function() {
	document.getElementById("add-task").style.display = "block";
})