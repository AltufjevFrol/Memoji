/*Класс User*/

function User(name){
	this.name = name;
	let achName = document.querySelector('.name');
	achName.textContent = this.name;
}