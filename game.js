/*Объект game
*game.card1-card12 - объекты класса Card
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
	htmlForm: '<form  name="start"action="#"><fieldset><legend>Your Name</legend><input autofocus type="text" id="name"></p></fieldset><fieldset><legend>Time to try</legend><input type="range" name="time" min="10" max="120" step="10"><p class="log"></p></fieldset><input type="submit" name="submit" value="Go!"></form>',
	htmlWin: '<div class="float_window"><h2><span>W</span><span>i</span><span>n</span></h2><div class="botton">Play again</div></div>',
	htmlLose: '<div class="float_window"><h2><span>L</span><span>o</span><span>s</span><span>e</span></h2><div class="botton">Try again</div></div>',
	cardsDOM: Array.from(document.querySelectorAll('.card')),
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
	this[card.class] = card;
	}, this);
	return this;
};

game.defPartner = function(){
	for(prop in this){
		if(this[prop].partner === null){
			let emoji = this[prop].emoji;
			let card = this[prop];
			for(prop in this){
				if(emoji === this[prop].emoji){
					this[prop].partner = card;
					card.partner = this[prop];
					break;
				}
			}
		}
	}
};

game.animationPreload = function(){
	let delay = 0;
	for(let i=1; i<=this.cardsDOM.length; i++){
		let delayStart = delay;
		setTimeout(game['card'+i].show.bind(game['card'+i]), delayStart);
		setTimeout(game['card'+i].spin.bind(game['card'+i]), delayStart);
		let delayStop = delayStart + 1000;
		setTimeout(game['card'+i].doNotSpin.bind(game['card'+i]), delayStop);
		delay = delay + 1000;
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
let opens = [];
let counterOutCards = 0;
field.addEventListener('click', clickOnCard);
function clickOnCard(event){
	if(event.target.classList.contains('back')){
		let card = game[event.path[1].classList[1]].revert();
		if(card){
			let index =opens.findIndex(function(item){
				return item.class === card.class;
			});
			opens.splice(index,1);
		}
	}if(event.target.classList.contains('front')){
		let card = game[event.path[1].classList[1]].turn();
		if(card){
			opens.push(card);
			game.user.countTurn = ++game.user.countTurn;
		}
		if(opens.length===2){
			opens[0].lock = true;
			opens[1].lock = true;
			if(opens[0].partner === opens[1] && opens[1].partner === opens[0]){
				opens[0].paintRight().partner.paintRight();
				opens[0].partnerFound = true;
				opens[0].partner.partnerFound = true;
				counterOutCards = counterOutCards+2;
			}else{
				opens[0].paintWrong();
				opens[1].paintWrong();
			}
		}else if(opens.length===3){
			if(opens[0].partnerFound){
				opens.splice(0,2);
			}else{
				opens[0].lock = false;
				opens[1].lock = false;
				opens[0].clearWrong();
				opens[1].clearWrong();
				opens[0].revert();
				opens[1].revert();
				opens.splice(0,2);
			}
		}
	}
	if(counterOutCards === game.cardsDOM.length){
		game.user.countTurn = counterOutCards;
		game.win();
	}
}
game.clickOnCard = clickOnCard;//для снятия слушителя в другом методе
};

game.start = function(){
	let field = document.createElement('section');
		field.classList.add('float_field');
		field.innerHTML = game.htmlForm;
		/*let memoji = document.querySelector('.memoji');*/
		document.body.appendChild(field);

			let range = document.querySelector('input[type="range"]');
			let log = document.querySelector('.log');
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
	let botton = document.querySelector('.float_field .botton');
	botton.addEventListener('click', game.restart.bind(null, field));
	game.user.bestTime = game.user.time < game.user.bestTime ? game.user.time : game.user.bestTime;
	game.user.bestCountTurn = game.user.countTurn < game.user.bestCountTurn ? game.user.countTurn : game.user.bestCountTurn;
	game.updateAchieving();
};

game.lose = function(){
	document.querySelector('.field').removeEventListener('click', game.clickOnCard);
	let field = document.createElement('section');
	field.classList.add('float_field');
	field.innerHTML = game.htmlLose;
	document.body.appendChild(field);
	let botton = document.querySelector('.float_field .botton');
	botton.addEventListener('click', game.restart.bind(game, field));
	game.updateAchieving();
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
	document.body.removeChild(block);
	game.cardsDOM.forEach((item, index)=>{
		let i = ++index;
		item.className = 'card '+'card'+i;
	})
	
	game.createCards();//сооздаем объекты карточек
	game.defPartner();//определяем пары
	game.animationPreload();
	document.querySelector('.card12').addEventListener('animationstart', () => {
	setTimeout(game.play, 2000);
	});//ждем окончания анимации и запускаем процесс игры
}