const time = 60;//время на игру
const memoji = document.querySelector('.memoji');//блок с игрой
const field = document.querySelector('.field');//блок с карточками
const cards = Array.from(document.querySelectorAll('.card'))//массив с элементами card
let stopId;//id остановки таймера
let opens = [];//массив с двумя открытыми карточками
let greens = [];//массив с уже совпавшими картами
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
			opens.push(event.path[1]);//складываем в массив открытых карт
			if(opens.length == 2){
				finding(opens);//ищем пару
			}
			if(opens.length == 3){
				resetRed(opens);
			}
			if(greens.length == cards.length){
				win();
			}
		break;

		case 'back':
			if (!(event.path[1].dataset.state =='lock')){//проверям можно закрыть карту или нет
			event.path[1].classList.remove('turn')// выключаем поворот
			opens.splice(0, 1);
			}
		break;
	}
}

/*функция определения пары*/
function finding (two) {
	two[0].dataset.state = 'lock';
	two[1].dataset.state = 'lock';
	if(two[0].dataset.symbol == two[1].dataset.symbol){
		two[0].classList.add('green');
		two[1].classList.add('green');
		greens.push(two[0], two[1]);
	}else{
		two[0].classList.add('red');
		two[1].classList.add('red');
	}
}

	/*функция сброса красных карт*/
	function resetRed (two) {
		if (two[0].classList.contains('red')){
			let resets = two.splice(0, 2);
			delete resets[0].dataset.state;
			delete resets[1].dataset.state;
			resets[0].classList.remove('red', 'turn');
			resets[1].classList.remove('red', 'turn');
		}else{
			two.splice(0, 2);
		}
	}

/*функция таймера*/
	function timer () {
	let count = time;
	stopId = setInterval(function () {
		count=count-1;
		watch.textContent = count>=10 ?'00:'+ count :'00:0'+ count;
		if(count == 0 && greens.length != cards.length){
			lose();
		}
		},1000)	
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
	opens.splice(0, opens.length);
	greens.splice(0, greens.length);
	distribute(cards); // раскидали карточки
	watch.textContent = '01:00';//обновили таймер
	field.addEventListener('click', function firstClick(){timer();//ждем первый клик и запускаем таймер
	field.removeEventListener('click', firstClick)});//удаляем этот обработчик
}
