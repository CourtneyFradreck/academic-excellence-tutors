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


