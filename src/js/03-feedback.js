import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const feedbackFormEl = document.querySelector('.feedback-form');

feedbackFormEl.addEventListener('input', throttle(saveFormState, 500));
feedbackFormEl.addEventListener('submit', onFormSubmit);

retrieveFormState(feedbackFormEl);

function saveFormState(e) {
  const formEl = e.target.closest('form');
  const formState = {
    email: formEl.email.value,
    message: formEl.message.value,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formState));
}

function onFormSubmit(e) {
  e.preventDefault();

  const formState = {
    email: e.currentTarget.email.value,
    message: e.currentTarget.message.value,
  };
  console.log(formState);

  e.currentTarget.reset();

  clearFormState();
}

function retrieveFormState(formEl) {
  if (!localStorage.getItem(STORAGE_KEY)) return;

  const { email, message } = JSON.parse(localStorage.getItem(STORAGE_KEY));
  formEl.email.value = email;
  formEl.message.value = message;
}

function clearFormState() {
  localStorage.removeItem(STORAGE_KEY);
}
