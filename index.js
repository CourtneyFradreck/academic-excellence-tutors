let mobileNumber = document.getElementById('mobileNumber');
function check(mobileNumber) {
  if (mobileNumber.value.length < 10) {
    mobileNumber.setCustomValidity('Error: Mobile number should have 10 digits');
  } else {
    mobileNumber.setCustomValidity('');
  }
}
const toggleButton = document.getElementsByClassName('toggle-button')[0];
const closebtn = document.getElementById('close-btn');
closebtn.addEventListener('click', () => {
  navBar.classList.toggle('active');
});
const navBar = document.getElementsByClassName('navbar')[0];
toggleButton.addEventListener('click', () => {
  navBar.classList.toggle('active');
});
const form = document.getElementById('form');
const close_popup_btn = document.getElementById('close_popup_btn');
const popup_wrapper = document.getElementById('wrapper');

close_popup_btn.addEventListener('click', () => {
  popup_wrapper.style.display = 'none';
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  popup_wrapper.style.display = 'flex';
}, false);



form.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Collect form data
  const formData = new FormData(form);

  // Prepare data to send to server
  const requestData = {
    method: 'POST',
    body: formData
  };

  try {
    // Send form data to server
    const response = await fetch('process_form.php', requestData);
    if (response.ok) {
      // Show thank you message if form is successfully submitted
      popup_wrapper.style.display = 'flex';
      // You can also reset the form if needed
      form.reset();
    } else {
      console.error('Error submitting form:', response.statusText);
    }
  } catch (error) {
    console.error('Error submitting form:', error);
  }
}, false);

