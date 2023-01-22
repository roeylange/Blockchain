document.getElementById("checkPassBTN").addEventListener('click',function checkPassword() {
    var passwordInput = document.getElementById("passwordInput");
    var password = passwordInput.value;

    if (password === "12345") {
      document.getElementById("goToAdminPageBTN").classList.remove("toggle");
      alert("You're now authorized to click the button.")
    } else {
      // Display an error message
      alert("Incorrect password");
    }
  });