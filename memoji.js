const time = 60;//время на игру
const memoji = document.querySelector('.memoji');//блок с игрой
const field = document.querySelector('.field');//блок с карточками
const cards = Array.from(document.querySelectorAll('.card'))//массив с элементами card
let stopId;//таймер останавливаеться из разных мест поэтому переменная должна быть в общей области видимости
/*тут наш зоопарк*/
const symbols = [
'crocodile',
'monkey',
'kraken',
'ledy_bug',
'frog',
'cat',]

/*блок с часами*/
const watch = document.createElement('div');//создаем блок с часами
watch.classList.add('watch');//добавляем стили часов
watch.textContent = '01:00';//ставим начальное время
memoji.appendChild(watch);//добавляем часы на страницу

/*всплывающее окно*/
let windows = document.createElement('div');
windows.classList.add('float_field');

/*ждем первый клик и запускаем таймер после чего удаляем этот обработчик*/
field.addEventListener('click', function firstClick(){if(event.target.className == 'front')timer();
field.removeEventListener('click', firstClick)});

field.addEventListener('click', clickHandler);//ставим обработчик кликов по карточкам

distribute(cards); // раскидали карточки

/*функция разброса карточек*/
function distribute(nods) {
	let pull = symbols.concat(symbols);
	for (let i=0; i < nods.length; i++) {
		let indexRandom = Math.floor(Math.random()*(pull.length));
		nods[i].dataset.symbol = pull[indexRandom];
		pull.splice(indexRandom,1);
	}
}

/*обработчик клика*/
function clickHandler (event) {
	switch (event.target.className){// нас интересуют две цели .front и .back
		case 'front':
			event.path[1].classList.add('turn');//включаем поворот на 180
			finding();//ищем пару
			//проверяем все карточки открыты или не все
			if (Array.from(document.querySelectorAll('.card')).length ==
					Array.from(document.querySelectorAll('.green')).length){
					win();//выводим окно
			}
		break;

		case 'back':
			if (!(event.path[1].dataset.state =='lock')){//проверям можно закрыть карту или нет
			event.path[1].classList.remove('turn')// выключаем поворот
			}
		break;
	}
}

/*функция определения пары*/
function finding () {
	cards.forEach(CallbackResetRed);// ищем красные карты и сбрасываем их
	cards.forEach(CallbackFindTwoCards);// подсветили две открытые карточки зеленым или красным согласно правилам игры

	/*функция сброса красных карт*/
	function CallbackResetRed (card) {
		if (card.classList.contains('red')){
			delete card.dataset.state;
			card.classList.remove('red', 'turn');
		}
	}

/*функция подсвечивания карт*/
	function CallbackFindTwoCards (card) {
		/*проверяем есть ли еще открытые не заблокированные кроме той что мы открыли
			если есть то блокируем обе и сравниваем их если нет то ничего не делаем*/
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
}
/*конец функции определения пары*/

/*функция таймера*/
	function timer () {
	let count = time;
	stopId = setInterval(function () {count=count-1;
	watch.textContent = count>=10 ?'00:'+ count :'00:0'+ count;
	if(count === 0 && Array.from(document.querySelectorAll('.card')).length !=
					Array.from(document.querySelectorAll('.green')).length){
		lose();
	}},1000)	
}

function win () {
	clearInterval(stopId);//останавливаем таймер
	/*наполняем всплывающее окно*/
	windows.innerHTML = '<div class="float_window"><h2><span>W</span><span>i</span><span>n</span></h2><div class="botton">Play again</div></div>';
	memoji.appendChild(windows);//выводим окно
	let botton = document.querySelector('.botton');
	botton.addEventListener('click', reload);//обработчик кнопки
}

function lose () {
	clearInterval(stopId);//останавливаем таймер по истечении времени
	/*наполняем всплывающее окно*/
	windows.innerHTML = '<div class="float_window"><h2><span>L</span><span>o</span><span>s</span><span>e</span></h2><div class="botton">Try again</div></div>';
	memoji.appendChild(windows);//выводим окно
	let botton = document.querySelector('.botton');
	botton.addEventListener('click', reload);//обработчик кнопки
}

/*функция перезагрузки*/
function reload (){
	memoji.removeChild(windows);//закрыли окно
	cards.forEach((card)=>{delete card.dataset.state;
	card.classList.remove('red', 'green', 'turn');});//разблокировали, перевернули карты
	distribute(cards); // раскидали карточки
	watch.textContent = '01:00';//обновили таймер
	field.addEventListener('click', function firstClick(){timer();//ждем первый клик и запускаем таймер
	field.removeEventListener('click', firstClick)});//удаляем этот обработчик
}
