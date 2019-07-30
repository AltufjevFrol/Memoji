/*объект таймера
*timer.start(s, fun, args) принимает от 0 до 3 аргументов 
*[время в секундах от 1 до 99, функция которую нужно запустить по окончании времени,
* и массив с аргументами функции] 
* без аргументов - запускаеться таймер по умолчанию на 60 секунд
* с двумя аргументами - запускаеться на указанное время запускает функцию без аргументов
* с тремя аргументами - запускаеться на указанное время запускает функцию с аргументами из массива
* метод возвращает объект
*
*timer.stop() не принимает аргументы останавливает отсчет и возвращает количество прошедших секунд
*/
const timer = {
	_circle: document.querySelector('.circle'),
	_counter: document.querySelector('.count'),
	_cx: document.querySelector('.timer').offsetWidth*0.5,
	_cy: document.querySelector('.timer').offsetWidth*0.5,
	_r: document.querySelector('.timer').offsetWidth*0.48,
	_lengthCircle: Math.PI*2*(document.querySelector('.timer').offsetWidth*0.48),
	_time: undefined,
	_count: 0,
	_fun: null,
	_idRun: undefined,
	_idCounter: undefined,

	_setTime: function(sec){
		s = parseInt(sec);
		if(typeof s === 'number' && 0<s && s<=120){
			this._time = s;
		}else{
			this._time = 60;
		}
	},

	start: function(s, fun, args){

		if(this._count !== 0){return}// не запускать если отсчет не закончен

		switch (arguments.length) {
			case 0:
				this._setTime(60);
				this._fun = null;
				break
			
			case 1:
				this._setTime(s);
				this._fun = null;
				break
			
			case 2:
				this._setTime(s);
				this._fun = fun;
				args = [];
				break
			
			case 3:
				this._setTime(s);
				this._fun = fun;
				break
			
			default:
				this._setTime(60);
				this._fun = null;

		}

		let self = this;
		let dashoffset = self._lengthCircle;
		this._count = this._time;//для счета
		this._counter.textContent = this._time;
		this._circle.style.animation = 'none';
		

		function run (){
		dashoffset = dashoffset - self._lengthCircle/(self._time*10);
		self._circle.setAttribute('stroke-dashoffset', dashoffset);
		}

		function counter () {
		self._count--;
		self._counter.textContent = self._count;
		if(self._count===Math.floor(self._time/100*25)){
			self._counter.style.animation = 'pulse 800ms infinite alternate forwards linear';
		}
		if(self._count===0){
			clearInterval(self._idCounter);
			clearInterval(self._idRun);
			self._counter.style.animationIterationCount = '1';
				if(typeof self._fun === 'function' && Object.getPrototypeOf(args).constructor === Array){
				self._fun.apply(window, args);
				}
		}
	}

	this._idRun = setInterval(run, 100);
	this._idCounter = setInterval(counter, 1000);
	return this;

	},

	stop: function(){
		clearInterval(this._idCounter);
		clearInterval(this._idRun);
		if(this._counter.style.animation !== 'none'){
		this._counter.style.animationIterationCount = '1';//что бы после остановки анимация застывала на красном
		}
		let result = this._time - this._count;
		this._count = 0;
		return result;
	},
};

/*задержка что бы таймер успел отрисоваться и переменные получили нормальные значения*/
	setTimeout(function(){
		/*устанавливаем размер шрифта в зависимости от размера счетчика на странице*/
		let heightCount = timer._counter.offsetHeight;
		timer._counter.style.fontSize = heightCount/3 + 'px';
		timer._counter.style.lineHeight = heightCount + 'px';
		/*установка размеров индикатора*/
		timer._circle.setAttribute('cx',timer._cx);
		timer._circle.setAttribute('cy',timer._cy);
		timer._circle.setAttribute('r',timer._r);

		/*сдвигаем всю обводку circle до конца*/
		timer._circle.setAttribute('stroke-dasharray', timer._lengthCircle);
		timer._circle.setAttribute('stroke-dashoffset', timer._lengthCircle);
	
		/*устанавливаем начальное значение счетчика*/
		timer._counter.textContent = '0';},100);