const form = {
	name: undefined,
	time: 0,
	getForm: function(){
		let field = document.createElement('section');
		field.classList.add('float_field');
		field.innerHTML = '<form  name="start"action="#"><fieldset><legend>Your Name</legend><input autofocus type="text" id="name"></p></fieldset><fieldset><legend>Time to try</legend><input type="range" name="time" min="10" max="120" step="10"><p class="log"></p></fieldset><input type="submit" name="submit" value="Go!"></form>'
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
				name.style.background = 'initial';
				form.name = name.value;
				form.time = range.value;
				game.user = new User(form.name);
				document.body.removeChild(field);
				game.animationPreload();
			}else {
				name.style.background = 'rgba(255, 0, 0, 0.7)';
			}
		}

	}



}