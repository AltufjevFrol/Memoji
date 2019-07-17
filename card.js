/*								Класс Card
*Card.element - хранит ссылку на связанный элемент DOM
*Card.class - хранит строку c именем класса связанного с ним элемента
*Card.emoji - хранит кодовую точку символа на карточке
*Card.partner - хранит ссылку на объект класса Card имеющего такой же символ
*Card.lock - хранит булево значение метку блокировки от нажатий
*Card.turn() - переворачивает карточку картинкой вверх
*Card.revert() - переворачивает карту обратно
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
	this.partnerFound = false;
}

Card.prototype = {
	constructor: Card,
	turn: function(){
		if(this.lock){
			return;
		}else{
		this.element.childNodes[3].textContent = String.fromCodePoint(this.emoji);
		this.element.classList.add('turn');
		return this;
		}
	},
	revert: function(){
		if(this.lock){
			return;
		}else{
		this.element.classList.remove('turn');
		this.element.childNodes[3].textContent = '';
		return this;
		}
	},
	spin: function(){
		this.element.lastElementChild.hidden=true;
		this.element.classList.add('spin');
		return this;
	},
	doNotSpin: function(){
		this.element.lastElementChild.hidden=false;
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
		this.element.lastElementChild.classList.remove('wrong_color');
		this.element.lastElementChild.classList.add('right_color');
		return this;
	},
	paintWrong: function(){
		this.element.lastElementChild.classList.remove('right_color');
		this.element.lastElementChild.classList.add('wrong_color');
		return this;
	},
	clearRight: function(){
		this.element.lastElementChild.classList.remove('right_color');
		return this;
	},
	clearWrong: function(){
		this.element.lastElementChild.classList.remove('wrong_color');
		return this;
	},
	clear: function(){
		this.element.lastElementChild.classList.remove('wrong_color', 'right_color');
		return this;
	}
}
