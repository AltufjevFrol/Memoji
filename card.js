/*Класс Card
*Card.element - хранит ссылку на связанный элемент DOM
*Card.class - хранит строку c именем класса связанного с ним элемента
*Card.emoji - хранит кодовую точку символа на карточке
*Card.partner - хранит ссылку на экземпляр класса Card имеющего такой же символ
*Card.lock - хранит значение блокировки от нажатий
*Card.turn() - переворачивает карточку картинкой вверх если не заблокирована
*Card.revert() - переворачивает карту обратно если не заблокирована
*Card.spin() - пускает карточку в бесконечное вращение
*Card.doNotSpin() - останавливает вращение
*Card.hide() - прячет карту
*Card.show() - показывает карту
*Card.paintRight() - подсвечивает карту в "правильный" цвет
*Card.paintWrong() - подсвечивает карту в "неправильный" цвет
*Card.clearRight() - снимает подсветку "неправильным" цветом
*Card.clearWrong() - снимает подсветку "правильным" цветом
*Card.clear() - снимает обе подсветки
*/

/*Конструктор Card принимает два аргумента элемент DOM и массив парных кодовых точек символов*/
function Card (element, emojis) {
	this.element = element;
	this.class = element.classList[1];
	this.emoji = emojis.splice([Math.floor(Math.random()*(emojis.length))], 1)[0];
	this.partner = null;
	this.lock = false;
/*настройки для IE*/
	if(window.navigator.userAgent.indexOf('NET') !== -1){
		element.children[0].style.transform = 'inherit';
		element.children[1].style.transform = 'inherit';
		element.style.transformStyle = 'flat';
	}
}

Card.prototype = {
	constructor: Card,

	turn: function(){
		if(this.lock){
			return;
		}else{
		let target = '.'+this.class+' .face';
		document.querySelector(target).textContent = String.fromCodePoint(this.emoji);
		this.element.classList.add('turn');
		return this;
		}
	},
	revert: function(){
		if(this.lock){
			return;
		}else{
		let target = '.'+this.class+' .face';
		document.querySelector(target).textContent = '';
		this.element.classList.remove('turn');
		return this;
		}
	},
	spin: function(){
		this.element.classList.add('spin');
		return this;
	},
	doNotSpin: function(){
		this.element.classList.remove('spin');
		return this;
	},
	hide: function(){
		this.element.style.visibility = 'hidden';
		return this;
	},
	show: function(){
		this.element.style.visibility = 'visible';
		return this;
	},
	paintRight: function(){
		let target = '.'+this.class+' .face';
		document.querySelector(target).classList.remove('wrong_color');
		document.querySelector(target).classList.add('right_color');
		return this;
	},
	paintWrong: function(){
		let target = '.'+this.class+' .face';
		document.querySelector(target).classList.remove('right_color');
		document.querySelector(target).classList.add('wrong_color');
		return this;
	},
	clearRight: function(){
		let target = '.'+this.class+' .face';
		document.querySelector(target).classList.remove('right_color');
		return this;
	},
	clearWrong: function(){
		let target = '.'+this.class+' .face';
		document.querySelector(target).classList.remove('wrong_color');
		return this;
	},
	clear: function(){
		let target = '.'+this.class+' .face';
		document.querySelector(target).classList.remove('wrong_color');
		document.querySelector(target).classList.remove('right_color');
		return this;
	}
}
