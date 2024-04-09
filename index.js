let mobileNumber =document.getElementById("mobileNumber");
function check(mobileNumber) {
    if (mobileNumber.value.length < 10) {
        mobileNumber.setCustomValidity("Error: Mobile number should have 10 digits");
    } else {
        mobileNumber.setCustomValidity("");
    }
}
const toggleButton = document.getElementsByClassName("toggle-button")[0];
const navBar = document.getElementsByClassName("navbar")[0];
toggleButton.addEventListener("click", () =>{
    navBar.classList.toggle("active")
})