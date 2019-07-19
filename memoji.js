game.start();//выводим окно приветствия
game.createCards();//сооздаем объекты карточек
game.defPartner();//определяем пары

document.querySelector('.card12').addEventListener('animationstart', startGame);//ждем окончания анимации и запускаем процесс игры

function startGame(){
setTimeout(game.play, 500);
document.querySelector('.card12').removeEventListener('animationstart', startGame,true)
}

/*const achieving = document.querySelector('.achieving');
const bottonAchieving = document.querySelector('.botton_achieving');
ach.addEventListener('click', clickAchieving);
bottAch.addEventListener('click', clickBottonAchieving);

function clickAchieving(){

};

function clickBottonAchieving(){

};*/