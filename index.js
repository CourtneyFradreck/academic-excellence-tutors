var mobileNumber =document.getElementById("mobileNumber");
function check(mobileNumber) {
    if (mobileNumber.value.length < 10) {
        mobileNumber.setCustomValidity("Error: Mobile number should have 10 digits");
    } else {
        mobileNumber.setCustomValidity("");
    }
}