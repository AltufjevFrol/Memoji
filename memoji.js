game.start();//выводим окно приветствия
game.createCards();//сооздаем объекты карточек
game.defPartner();//определяем пары

document.querySelector('.card12').addEventListener('animationstart', startGame);//ждем окончания анимации и запускаем процесс игры

function startGame(){
setTimeout(game.play, 500);
document.querySelector('.card12').removeEventListener('animationstart', startGame)
}

const ach = document.querySelector('.achieving');
const bottAch = document.querySelector('.botton_achieving');
ach.addEventListener('click', clickAch);
bottAch.addEventListener('click', clickBottAch);

function clickAch(){

};

function clickBottAch(){

};