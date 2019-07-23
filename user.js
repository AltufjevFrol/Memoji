/*Класс User
*name имя
*timeToPlay - время на игру;
*countTurn - сколько раз открывал карточки за сыгранную игру
*time - время за которое открыл все карты за игру
*bestCountTurn - наименьшее количество открываний за все сыгранные игры
*bestTime - лучше время из всех сыгранных игр
*countWin - количество поражений
*countLose - колиство поражений
*/

function User(name){
	this.name = name;
	let achName = document.querySelector('.name');
	achName.textContent = this.name;
	this.countWin = 0;
	this.countLose = 0;
	this.bestCountTurn = Infinity;
	this.bestTime = Infinity;
	this.countTurn = 0;
}