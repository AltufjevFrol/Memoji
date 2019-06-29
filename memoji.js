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
		break;

		case 'back':
			event.path[1].classList.remove('turn')// выключаем поворот
		break;
	}
	console.log(event.path[1].className);
}


const field = document.querySelector('.field');// получаем поле с карточками

field.addEventListener('click', clickHandler);//ждем на нем всплывающие событие клика



