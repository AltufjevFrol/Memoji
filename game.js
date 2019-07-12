/*Объект game
*game.card1-card12 - объекты класса Card
*game.createCards - создает объекты класса Card
*game.defPartner - заполняет поле partner объектов класса Card 
*ссылками друг на друга у объектов с одинаковыми символами
*/
const game = {};

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

	let cards = document.querySelectorAll('.card');

	cards.forEach(function(item){
	let card = new Card (item, emojis);
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