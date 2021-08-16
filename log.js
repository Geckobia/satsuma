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