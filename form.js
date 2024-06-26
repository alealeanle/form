"use strict"

document.addEventListener('DOMContentLoaded', () => {
	const form = document.getElementById('form');
	form.addEventListener('submit', send);

	async function send(e) {
		e.preventDefault();

		let error = formValidate(form);

		let formData = new FormData(form);

		if (error === 0) {
			form.classList.add('_sending');
			let response = await fetch ('sendmail.php', {
				method: 'POST',
				body: formData
			});
			if (response.ok) {
				let result = await response.json();
				alert(result.message);
				formPreview.innerHTML = '';
				form.reset();
				form.classList.remove('_sending');
			} else {
				alert('Ошибка');
			}
		} else {
			alert('Корректно заполните обязательные поля');
		}
	}
	function formValidate(form) {
		let error = 0;
		let formReq = document.querySelectorAll('._req');
		for (let i = 0; i < formReq.length; i++) {
			const input = formReq[i];
			formRemoveError(input);
			if (input.classList.contains('_tel')) {
				if (telTest(input)) {
					formAddError(input);
					error++;
				}
			} else {
				if (input.value === '') {
					formAddError(input);
					error++;
				}
			}
		}
		return error;
	}
	function formAddError(input) {
		input.parentElement.classList.add('_error');
		input.classList.add('_error');
	}
	function formRemoveError(input) {
		input.parentElement.classList.remove('_error');
		input.classList.remove('_error');
	}
	function telTest(input) {
		return !/^(\+7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/.test(input.value);
	}
});