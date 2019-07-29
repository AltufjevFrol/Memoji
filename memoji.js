game.start();//выводим окно приветствия
game.createCards();//сооздаем объекты карточек
game.defPartner();//определяем пары

document.querySelector('.card12').addEventListener('animationstart', startGame);//ждем окончания анимации и запускаем процесс игры

function startGame(){
setTimeout(game.play, 500);
document.querySelector('.card12').removeEventListener('animationstart', startGame,true)
}

const achieving = document.querySelector('.achieving');
achieving.addEventListener('click', clickAchieving);
function clickAchieving(){
	if(achieving.classList.contains('achieving_click')){
		achieving.classList.remove('achieving_click');
	}else{
		achieving.classList.add('achieving_click');
	}
};
if(window.navigator.userAgent.indexOf('NET') !== -1){
	achieving.style.top = '0';
	achieving.style.marginTop = '50px';
}