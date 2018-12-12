

document.getElementById('addHabit').addEventListener('click', LightBox, false);
document.getElementById('addNewHabbit').addEventListener('click', getName, false);
document.getElementById('addNewHabbit').addEventListener('click', LightBox, false);

var start = document.querySelector('.habitContainer'); // UL
var liNode = document.createElement('li');
var pNode = document.createElement('p');
var lightBox = document.querySelector('.lightBox');
let label = lightBox.children[0].children[0];
let addBtn = document.getElementById('addNewHabbit');
let updateBtn = document.getElementById('updateHabbit');
const completedColor = 'lightgreen';
const inspirationalText = ['Keep Going!', 'Keep It Up!', 'You Can Do This!', "Don't Procrastinate!", 'Get After It!', "Rome Wasn't Built in a Day!", 'Crush It!'];

(function init() {
	let randomMsg = document.getElementById('randomMsg');
	let x = Math.floor(Math.random() * (0 + inspirationalText.length));
	randomMsg.innerHTML = inspirationalText[x];
})();

function LightBox() {
	lightBox.classList.toggle('show');
}

function getName() {
	var habitName = document.getElementsByName('habitName')[0].value;
	if (document.getElementById(`${habitName}`)) {
		alert(`${habitName} already exists`);
	} else {
		CreateHabit(habitName, 'freq placeholder str');
	}	
}

function CreateHabit(name, freq) {
	if (!name) {
		alert('please enter a habit');
	} else {
		/*******if name has spaces, convert to underscore or camelcase for ID to stay clean below**/
		// create nodes with proper info
		var html = `<li class="habitItem">
					<p id="%ID%" class="habitName">%name%</p>
					<i class="remove fa fa-times" aria-hidden="true"></i>
					<i class="complete fa fa-check" aria-hidden="true"></i>
				</li>`;

		var newHtml = html.replace('%name%', name);
		newHtml = newHtml.replace('%ID%', name);
		start.insertAdjacentHTML('beforeend', newHtml);

		bkgColor();

		document.getElementsByClassName('habitItem')[(start.children.length - 1)].children[0].addEventListener('click', function() {
			let name = this.id;
			LightBox();
			makeUpdateBtn(name);
			update(name);
		}, false);
		
		document.getElementsByClassName('remove')[(start.children.length - 1)].addEventListener('click', function() {
			let name = this.parentNode.children[0].id;
			removeHabit(name);
		}, false);

		document.getElementsByClassName('complete')[(start.children.length - 1)].addEventListener('click', function() {
			let name = this.parentNode.children[0].id;
			completeHabit(name);
		}, false);
	}
}

function makeUpdateBtn(name) {
	let btnHtml = `<button type="submit" name="${name}" id="update${name}" class="upbtn displayToggle">Update ${name}</button>`;
	document.getElementById('lbContainer').insertAdjacentHTML('beforeend', btnHtml);
}

function update(name) {
	console.log(name);
	let updateBtn = document.getElementById(`update${name}`);
	flipDisplay()
	console.log(updateBtn);
	updateBtn.addEventListener('click', function() {
		habitName = document.getElementsByName('habitName')[0].value; //initial input value
		target = document.getElementById(name);
		target.innerHTML = `${habitName}`;
		target.id = `${habitName}`;
		name = habitName;

		LightBox();
		flipDisplay();
		deleteUDBtn();
		
	}, false);
}


function flipDisplay() {
	updateBtn = document.getElementsByClassName('upbtn');
	for (var i = 0; i < updateBtn.length; i++) {
		updateBtn[i].classList.toggle('displayToggle');
	}
}

function removeHabit(name) {
	if (document.getElementById(`${name}`) != null) {
		var el = document.getElementById(`${name}`);
		el.parentNode.parentNode.removeChild(el.parentNode);
		var updateBtn = document.getElementsByName(`update${name}`);

	deleteUDBtn();
	}
}

function completeHabit(name) {
	let el = document.getElementById(`${name}`);
	el.parentNode.style.backgroundColor = completedColor;	
}

function deleteUDBtn() {
	if (updateBtn != null) {
		for (let i = 0; i < updateBtn.length; i++) {
			updateBtn[i].parentNode.removeChild(updateBtn[i]);
		}	
	}
}

function bkgColor() {
	var colors = ['#FFA0C0', '#DAA0FF', '#A0DFFF',' #E0FF6D', '#FFF7A0'];
	var children = start.children;
	var x = 0;
	for (var i = 0; i < children.length; i++) {
		var child = children[i];
		if (child.style.backgroundColor != completedColor) {
			child.style.backgroundColor = colors[x];
		}
		
		x++;
		if (x > colors.length) {
			x = 0;
		}
	}
}