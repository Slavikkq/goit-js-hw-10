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
  
 
      promise.then(
        (resolvedDelay) => {
      
          showNotification(`✅ Fulfilled promise in ${resolvedDelay}ms`);
        },
        (rejectedDelay) => {
  
          showNotification(`❌ Rejected promise in ${rejectedDelay}ms`);
        }
      );
    });
  

    function showNotification(message) {
      iziToast.show({
        title: 'Notification',
        message: message,
        theme: 'light',
        position: 'topCenter',
        timeout: 5000,
        progressBarColor: 'rgba(255, 0, 0, 0.7)',
      });
    }
  });