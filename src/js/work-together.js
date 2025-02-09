import axios from 'axios';

//get all the elements from DOM
const reviewForm = document.querySelector('.footer-review-form');

const emailInput = document.querySelector('.email-input');
const emailLabel = document.querySelector('.email-label');

const messageInput = document.querySelector('.message-input');
const messageLabel = document.querySelector('.message-label');

const modalWindowWrapper = document.querySelector('.modal-window-wrapper');

//processing submit form
const onSumbitForm = event => {
  event.preventDefault();

  console.log(emailInput.checkValidity());
  //check the validity of fields
  if (emailInput.value.trim().length === 0 || !emailInput.checkValidity()) {
    emailLabel.classList.remove('input-label-succes');
    emailInput.classList.remove('input-field-succes');

    emailLabel.classList.add('email-label-error');
    emailInput.classList.add('input-field-error');

    if (messageInput.value.trim().length === 0) {
      messageLabel.classList.add('message-label-error');

      messageInput.classList.add('input-field-error');
    } else {
      messageLabel.classList.remove('message-label-error');
      messageInput.classList.remove('input-field-error');

      messageLabel.classList.add('input-label-succes');
      messageInput.classList.add('input-field-succes');
    }
    return;
  } else {
    emailLabel.classList.remove('email-label-error');
    emailInput.classList.remove('input-field-error');

    emailLabel.classList.add('input-label-succes');
    emailInput.classList.add('input-field-succes');
    if (messageInput.value.trim().length === 0) {
      messageLabel.classList.add('message-label-error');

      messageInput.classList.add('input-field-error');
      return;
    } else {
      messageLabel.classList.remove('message-label-error');
      messageInput.classList.remove('input-field-error');

      messageLabel.classList.add('input-label-succes');
      messageInput.classList.add('input-field-succes');
    }
  }

  //post the result
  let formData = {};

  const inputs = reviewForm.elements;

  for (let input of inputs) {
    if (input.name) {
      formData[input.name] = input.value;
    }
  }
  axios
    .post('https://portfolio-js.b.goit.study/api/requests', formData)
    .then(response => {
      modalWindowWrapper.classList.add('is-open');

      //close the modal on close btn
      const modalWindowClose = document.querySelector('.modal-close-btn');
      modalWindowClose.addEventListener('click', () => {
        modalWindowWrapper.classList.remove('is-open');
      });

      //close the modal on escape btn
      document.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
          modalWindowWrapper.classList.remove('is-open');
        }
      });

      //close the modal on bg click
      modalWindowWrapper.addEventListener('click', event => {
        if (event.target === modalWindowWrapper) {
          modalWindowWrapper.classList.remove('is-open');
        }
      });

      //clear form
      reviewForm.reset();

      emailLabel.classList.remove('input-label-succes');
      emailInput.classList.remove('input-field-succes');

      messageLabel.classList.remove('input-label-succes');
      messageInput.classList.remove('input-field-succes');
    })
    .catch(error => {
      console.log(error);
      alert('Something went wrong, please try again!');
    });
};

reviewForm.addEventListener('submit', onSumbitForm);
