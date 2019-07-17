game.start();//выводим окно приветствия
game.createCards();//сооздаем объекты карточек
game.defPartner();//определяем пары

document.querySelector('.card12').addEventListener('animationstart', () => {
setTimeout(game.play, 2000);
});//ждем окончания анимации и запускаем процесс игры