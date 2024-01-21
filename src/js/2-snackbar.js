document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.form');
  const delayInput = form.querySelector('input[name="delay"]');
  const stateInputs = form.querySelectorAll('input[name="state"]');
  const submitButton = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const delay = parseInt(delayInput.value, 10);
    const selectedState = Array.from(stateInputs).find(input => input.checked);

    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (selectedState && selectedState.value === 'fulfilled') {
          resolve(delay);
        } else {
          reject(delay);
        }
      }, delay);
    });

    promise
      .then(resolvedDelay => {
        iziToast.success({
          title: 'Ok',
          message: `✅ Fulfilled promise in ${resolvedDelay}ms`,
          position: 'topRight',
          backgroundColor: '#59A10D',
        });
      })
      .catch(rejectedDelay => {
        iziToast.error({
          title: 'Error',
          message: `❌ Rejected promise in ${rejectedDelay}ms`,
          position: 'topRight',
          backgroundColor: '#EF4040',
        });
      });
  });
});
