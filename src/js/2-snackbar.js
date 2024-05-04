import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
const inputForm = document.querySelector('input[name="delay"]');
const inputFulfilled= document.querySelector('input[value="fulfilled"]');
const form = document.querySelector('.form-snackbar');

form.addEventListener("submit", createPromise);

function createPromise(event) {
  event.preventDefault();
  const delay = inputForm.value;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => { 
    if (inputFulfilled.checked) {
      resolve(`Fulfilled promise in ${delay}ms`);
    } else {
      reject(`Rejected promise in ${delay}ms`);
    }
  }, delay);
});

promise.then(
  value => {
    iziToast.success({
      color:'#59A10D', position: 'topRight', messageColor: '#FAFAFB', iconColor: '#FFFFFF',
    message: `Fulfilled promise in ${delay}ms`,
}); 
  },
  error => {
    iziToast.error({
    color: '#B51B1B', position: 'topRight', messageColor: '#FAFAFB', iconColor: '#FFFFFF',
    message: `Rejected promise in ${delay}ms`,
});
  }
);
};


