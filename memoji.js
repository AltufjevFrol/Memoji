/*zoo*/
const symbols = [
'crocodile',
'monkey',
'kraken',
'ledy_bug',
'frog',
'cat',
]

const cards = Array.from(document.querySelectorAll('.card'))//получили массив с элементами card

/*функция разброса карточек*/

function distribute(nods) {
	let pull = symbols.concat(symbols);
	for (let i=0; i < nods.length; i++) {
		let indexRandom = Math.floor(Math.random()*(pull.length));
		nods[i].dataset.symbol = pull[indexRandom];
		pull.splice(indexRandom,1);
	}
}

distribute(cards); // раскидали карточки

/*обработчик клика*/
function clickHandler (event) {
	switch (event.target.className){// нас интересуют две цели .front и .back
		case 'front':
			event.path[1].classList.add('turn');//включаем поворот на 180
			finding();//ищем пару
		break;

		case 'back':
			if (!(event.path[1].dataset.state =='lock')){//проверям можно закрыть карту или нет
			event.path[1].classList.remove('turn')// выключаем поворот
			}
		break;
	}
	console.log(event.path[1].className);
}

/*функция определения пары*/
function finding () {

/*проверяем есть ли красные если есть то сбрасываем если нет то ничео не делаем*/
function CallbackResetRed (card) {
	if (card.classList.contains('red')){
		delete card.dataset.state;
		card.classList.remove('red', 'turn');
	}
}

/*проверяем есть ли еще открытые не заблокированные кроме той что мы открыли
если есть то блокируем обе и сравниваем их если нет то ничего не делаем*/
function CallbackFindTwoCards (card) {
	if (card.classList.contains('turn') && card.dataset.state != 'lock' && card !== event.path[1]) {
		card.dataset.state = 'lock';
		event.path[1].dataset.state ='lock';
		if (card.dataset.symbol==event.path[1].dataset.symbol){
			card.classList.add('green');//подсвечиваем зеленым данную
			event.path[1].classList.add('green');//подсвечиваем зеленым кликнутую
		}else {
			card.classList.add('red');//подсвечиваем красным данную
			event.path[1].classList.add('red');//подсвечиваем красным кликнутую
		}
	}
}

cards.forEach(CallbackResetRed);// сброс красных
cards.forEach(CallbackFindTwoCards);// подсветили две открытые карточки

}
/*конец функции определения пары*/


const field = document.querySelector('.field');// получаем поле с карточками

field.addEventListener('click', clickHandler);//ждем на нем всплывающие событие клика


