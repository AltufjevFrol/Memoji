/*Объект game
*game.cards - объекты класса Card
*game.createCards - создает объекты класса Card, карты изначально скрыты
*game.defPartner - заполняет поле partner объектов класса Card
*ссылками друг на друга у объектов с одинаковыми символами
*game.animationPreload -запускает анимацию карточек(карточки появляються и кружаться)
*game.start - создает приветственную форму собирает с нее данные и запускает анимацию карточек
*game.play - процесс игры
*game.win - процедура в случае победы
*game.lose - процедура в случае поражения

*game.useer - объект с данными игрока
*htmlForm - поле с кодом html
*htmlWin - поле с кодом html
*htmlLose - поле с кодом html
*/
const game = {
	htmlForm: '<form  name="start"action="#"><fieldset><legend>Your Name</legend><input autofocus type="text" id="name"></fieldset><fieldset><legend>Time to try</legend><input type="range" name="time" min="10" max="120" step="10"><p class="log"></p></fieldset><input type="submit" name="submit" value="Go!"></form>',
	htmlWin: '<div class="float_window"><h2><span>W</span><span>i</span><span>n</span></h2><p class = "message"></p><div class="botton">Play again</div></div>',
	htmlLose: '<div class="float_window"><h2><span>L</span><span>o</span><span>s</span><span>e</span></h2><p class = "message"></p><div class="botton">Try again</div></div>',
	cardsDOM: Array.from(document.querySelectorAll('.card')),
	cards: {},
};

game.createCards = function(){
	/*создаем пулл эмодзи*/
	let emojis = [];

	newRandomPoint:while (emojis.length < 12){
	let random = Math.floor(Math.random()*(128063-128000))+128000;

	for(let i=0; i<emojis.length; i++){
		if(random === emojis[i]){
			continue newRandomPoint;
		}
	}
	emojis.push(random, random);
	}

	this.cardsDOM.forEach(function(item){
	let card = new Card (item, emojis);
	card.hide();
	this.cards[card.class] = card;
	}, game);
	return this;
};

game.defPartner = function(){
	for(prop in this.cards){
		if(this.cards[prop].partner === null){
			let emoji = this.cards[prop].emoji;
			let card = this.cards[prop];
			for(prop in this.cards){
				if(emoji === this.cards[prop].emoji){
					this.cards[prop].partner = card;
					card.partner = this.cards[prop];
					break;
				}
			}
		}
	}
};

game.animationPreload = function(){
	let delay = 0;
	for(let i=1; i<=this.cardsDOM.length; i++){//не использую for in что бы гарантировать порядок прохода по картам
		let delayStart = delay;
		setTimeout(game.cards['card'+i].show.bind(game.cards['card'+i]), delayStart);
		setTimeout(game.cards['card'+i].spin.bind(game.cards['card'+i]), delayStart);
		let delayStop = delayStart + 500;
		setTimeout(game.cards['card'+i].doNotSpin.bind(game.cards['card'+i]), delayStop);
		delay = delay + 250;
	}
};

game.play = function(){
	const field = document.querySelector('.field')
	field.addEventListener('click', firstClick);
	function firstClick(event){
	if(event.target.classList.contains('front')){
		timer.start(game.user.timeToPlay, game.lose);
		field.removeEventListener('click', firstClick);
	}
}
game.opens = [];
game.outCards = [];
field.addEventListener('click', game.clickOnCard);
};

game.clickOnCard = function (event){//обработчик кликов отдельным методом так как хочу снимать лиснера в другом методе
	if(event.target.classList.contains('back')){
		let card = game.cards[event.path[1].classList[1]].revert();//имя карты в объекте game.card точно совпадает со вторым классом родителя event.target
		if(card){
			let index =game.opens.findIndex(function(item){
				return item.class === card.class;
			});
			game.opens.splice(index,1);
		}
	}if(event.target.classList.contains('front')){
		let card = game.cards[event.path[1].classList[1]].turn();//имя карты в объекте game.card точно совпадает со вторым классом родителя event.target
		if(card){
			game.opens.push(card);
			++game.user.countTurn;//здесь что то не так
		}
		if(game.opens.length===2){
			game.opens[0].lock = true;
			game.opens[1].lock = true;
			if(game.opens[0].partner === game.opens[1] && game.opens[1].partner === game.opens[0]){
				game.opens[0].paintRight().partner.paintRight();
				game.opens[0].partnerFound = true;
				game.opens[0].partner.partnerFound = true;
				game.outCards = game.outCards.concat(game.opens.splice(0, 2))//сбрасываем карты в выбовшие
			}else{
				game.opens[0].paintWrong();
				game.opens[1].paintWrong();
			}
		}else if(game.opens.length===3){
				game.opens[0].lock = false;//разблокируем обе карты
				game.opens[1].lock = false;
				game.opens[0].clearWrong();//убираем цвет
				game.opens[1].clearWrong();
				game.opens[0].revert();//переворачиваем назад
				game.opens[1].revert();
				game.opens.splice(0,2);//отставляем в открытых только одно последнию карту
		}
	}
	if(game.outCards.length === game.cardsDOM.length){//проверям на победу
		game.win();
	}
};

game.start = function(){
	let field = document.createElement('section');
		field.classList.add('float_field');
		field.innerHTML = game.htmlForm;
		/*let memoji = document.querySelector('.memoji');*/
		document.body.appendChild(field);

			let range = document.querySelector('input[type="range"]');
			let log = document.querySelector('.log');
			range.value = 60;
			log.textContent = range.value + ' sec';
			function updateValue() {
				log.textContent = range.value + ' sec';
			}
			range.addEventListener('input', updateValue);

		field.addEventListener('submit', submit);
		function submit(event){
			event.preventDefault();
			let name = document.querySelector('#name')
				if(name.value.length !== 0){
				game.user = new User(name.value);
				name.style.background = 'initial';
				game.user.timeToPlay = range.value;
				document.body.removeChild(field);
				game.animationPreload();
			}else {
				name.style.background = 'rgba(255, 0, 0, 0.7)';
			}
		}
};

game.win = function(){
	document.querySelector('.field').removeEventListener('click', game.clickOnCard);
	game.user.time = timer.stop();
	game.user.countWin = ++game.user.countWin;
	let field = document.createElement('section');
	field.classList.add('float_field');
	field.innerHTML = game.htmlWin;
	document.body.appendChild(field);
	let message = document.querySelector('.message')
	message.textContent = 'Your time '+game.user.time+' seconds. '+' You opened cards '+game.user.countTurn+' times.'
	let botton = document.querySelector('.float_field .botton');
	botton.addEventListener('click', game.restart.bind(game, field));
	game.user.bestTime = game.user.time < game.user.bestTime ? game.user.time : game.user.bestTime;
	game.user.bestCountTurn = game.user.countTurn < game.user.bestCountTurn ? game.user.countTurn : game.user.bestCountTurn;
};

game.lose = function(){
	document.querySelector('.field').removeEventListener('click', game.clickOnCard);
	game.user.countLose = ++game.user.countLose;
	let field = document.createElement('section');
	field.classList.add('float_field');
	field.innerHTML = game.htmlLose;
	document.body.appendChild(field);
	let message = document.querySelector('.message')
	message.textContent = 'Tray better!'
	let botton = document.querySelector('.float_field .botton');
	botton.addEventListener('click', game.restart.bind(game, field));
};

game.updateAchieving = function(){
	let wins = document.querySelector('.achieving .wins');
	let loses = document.querySelector('.achieving .loses');
	let bestTime = document.querySelector('.achieving .best_time');
	let shortest_game = document.querySelector('.achieving .shortest_game');
	wins.textContent = game.user.countWin;
	loses.textContent = game.user.countLose;
	bestTime.textContent = game.user.bestTime === Infinity ?'-':game.user.bestTime;
	shortest_game.textContent = game.user.bestCountTurn === Infinity ?'-':game.user.bestCountTurn;
}

game.restart = function(block){
	game.updateAchieving();
	game.user.countTurn = 0;
	timer._counter.textContent = '0';
	timer._circle.style.animation = 'none';
	timer._circle.setAttribute('stroke-dashoffset', timer._lengthCircle);
	document.body.removeChild(block);
	/*здесь нужен сброс всех состояний карт*/
	for(prop in game.cards){
		game.cards[prop].lock = false;
		game.cards[prop].clear();
		game.cards[prop].revert();
	}
	/*здесь нужен сброс всех состояний карт*/
	game.createCards();//сооздаем объекты карточек
	game.defPartner();//определяем пары
	game.animationPreload();
	document.querySelector('.card12').addEventListener('animationstart', startGame);//ждем окончания анимации и запускаем процесс игры
}