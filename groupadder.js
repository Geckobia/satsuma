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