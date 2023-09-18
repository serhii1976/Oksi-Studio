import Notiflix from 'notiflix';
import axios from 'axios';
import validator from 'validator';

(() => {
  const refs = {
    openModalButton: document.querySelectorAll('.button'),
    closeModalButton: document.querySelector('.modal__close'),
    bacdropModal: document.querySelector('.bacdropModal'),
    title: document.querySelector('.modal__title'),
    text: document.querySelector('.modal__text'),
    form: document.querySelector('.modal__form'),
    inputsWraper: document.querySelectorAll('.input__wraper'),
    inputs: document.querySelectorAll('.modal__input'),
    labels: document.querySelectorAll('.modal__label'),
    check: document.querySelector('.modal__check'),
    button: document.querySelector('.modal__button'),
    modalBody: document.querySelector('body'),
  };

  refs.form.addEventListener('keyup', handleValidateForm);
  refs.openModalButton.forEach(button => {
    button.addEventListener('click', toggleMenu);
    button.addEventListener('click', resetError);
  });
  refs.closeModalButton.addEventListener('click', toggleMenu);
  refs.closeModalButton.addEventListener('click', resetForm);
  refs.form.addEventListener('submit', handleSubmit);

  function toggleMenu() {
    refs.bacdropModal.classList.toggle('is-hidden');
    refs.modalBody.classList.toggle('overflowHidden');
    refs.check.classList.toggle('is-hidden');

    if (!refs.check.classList.contains('is-hidden')) {
      refs.title.textContent = 'ЗАПИШІТЬСЯ';
      refs.text.textContent = 'Забронюйте свій час та отримайте знижку 30%';
      refs.button.textContent = 'ЗАПИСАТИСЬ';
      refs.check.classList.toggle('is-hidden');
      refs.inputsWraper.forEach(input => {
        input.classList.toggle('is-hidden');
      });
    }
  }

  function handleValidateForm(event) {
    if (event.target.value === '') {
      event.target.classList.remove('valid');
      event.target.classList.remove('invalid');

      event.target.labels.forEach(label => {
        label.classList.add('is-hidden');
      });
      return;
    }

    if (event.target.id === 'name') {
      if (validator.isAlpha(event.target.value, 'uk-UA')) {
        event.target.classList.add('valid');
        event.target.classList.remove('invalid');
        event.target.labels.forEach(label => {
          label.classList.add('is-hidden');
        });
      } else {
        event.target.classList.add('invalid');
        event.target.classList.remove('valid');
        event.target.labels.forEach(label => {
          label.classList.remove('is-hidden');
        });
      }
    }

    if (event.target.id === 'number') {
      if (validator.isMobilePhone(event.target.value, 'uk-UA')) {
        event.target.classList.add('valid');
        event.target.classList.remove('invalid');
        event.target.labels.forEach(label => {
          label.classList.add('is-hidden');
        });
      } else {
        event.target.classList.add('invalid');
        event.target.classList.remove('valid');
        event.target.labels.forEach(label => {
          label.classList.remove('is-hidden');
        });
      }
    }
  }

  function resetForm() {
    refs.inputs.forEach(input => {
      input.classList.remove('invalid');
      input.classList.remove('valid');
      input.value = '';
      if (input.id === 'number') {
        input.value = '+380';
      }
    });
  }

  function resetError() {
    refs.labels.forEach(label => {
      label.classList.add('is-hidden');
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const {
      elements: { client, number },
    } = event.currentTarget;

    const TOKEN = '6202495962:AAFGPR7JHz-y-V5duKktGMwh6_j8uYYHUek';
    const CHAT_ID = '-1001849383116';
    const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

    if (!refs.check.classList.contains('is-hidden')) {
      toggleMenu();
      resetForm();
      return;
    }

    if (client.value === '' || number.value === '') {
      return Notiflix.Notify.failure('Будьласка, заповніть всі поля', {
        width: '60%',
        position: 'center-top',
        fontSize: '20px',
        useIcon: false,
        borderRadius: '20px',
        failure: { background: '#f8a3b2', textColor: '#fff' },
      });
    }

    let message = `<b>Заявка з сайта</b>\n`;
    message += `<b>Ім'я:</b> ${client.value}\n`;
    message += `<b>Телефон:</b> ${number.value}`;

    async function postTelegram() {
      try {
        axios.post(URI_API, {
          chat_id: CHAT_ID,
          parse_mode: 'html',
          text: message,
        });
      } catch (error) {
        console.error(error);
      }
    }

    postTelegram();

    event.currentTarget.reset();

    refs.title.textContent = 'ЗАЯВКА ПРИЙНЯТА';
    refs.text.textContent = 'Ми Вам зателефонуємо для підтвердження запису';
    refs.button.textContent = 'ДОБРЕ';
    refs.check.classList.toggle('is-hidden');
    refs.inputsWraper.forEach(input => {
      input.classList.toggle('is-hidden');
    });
  }
})();
