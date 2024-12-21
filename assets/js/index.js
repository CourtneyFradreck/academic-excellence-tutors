//hamburger
const toggleButton = document.getElementsByClassName('toggle-button')[0];
const closebtn = document.getElementById('close-btn');
const navBar = document.getElementsByClassName('navbar')[0]; // Define navBar globally

closebtn.addEventListener('click', () => {
  navBar.classList.toggle('active');
});

toggleButton.addEventListener('click', () => {
  navBar.classList.toggle('active');
});

//mobile number validation
let mobileNumber = document.getElementById('mobileNumber');
function check(mobileNumber) {
  if (mobileNumber.value.length < 10) {
    mobileNumber.setCustomValidity('Error: Mobile number should have 10 digits');
  } else {
    mobileNumber.setCustomValidity('');
  }
}


document.getElementById("nextBtn").addEventListener("click", function(event) {
  event.preventDefault(); // Prevent form submission*
  
  // Get values of input fields
  let motherName = document.getElementById("motherName").value.trim();
  let fatherName = document.getElementById("fatherName").value.trim();
  let guardianName = document.getElementById("guardianName").value.trim();
  
  // Check if at least one field is filled
  if (motherName === "" && fatherName === "" && guardianName === "") {
    alert("Please fill in at least one parent/guardian field.");
    return false;
  }
  
  // If at least one field is filled, allow form submission
  document.getElementById("parentForm").submit();
});


//code to show the thank_you_popup function
const form = document.getElementById('form');
const close_popup_btn = document.getElementById('close_popup_btn');
const popup_wrapper = document.getElementById('popup_wrapper');

close_popup_btn.addEventListener('click', () => {
  popup_wrapper.style.display = 'none';
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  popup_wrapper.style.display = 'flex';
}, false);


/*
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
*/
