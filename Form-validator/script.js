document.addEventListener("DOMContentLoaded", function () {
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let form = document.querySelector("form");

form.addEventListener("submit", function (dets) {
  dets.preventDefault();

  // Reset messages
  document.querySelector("#emailError").textContent = "";
  document.querySelector("#passwordError").textContent = "";
  document.querySelector("#resultMessage").textContent = "";

  document.querySelector("#emailError").style.display = "none";
  document.querySelector("#passwordError").style.display = "none";

  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();

  // Regex
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&^])[A-Za-z\d@$!%*?#&^]{8,}$/;

  let isValid = true;

  // ✅ EMAIL VALIDATION
  if (emailValue === "") {
    document.querySelector("#emailError").textContent =
      "Email is required";
    document.querySelector("#emailError").style.display = "inline";
    email.classList.add("input-error");
    isValid = false;
  } else if (!emailRegex.test(emailValue)) {
    document.querySelector("#emailError").textContent =
      "Email is incorrect";
    document.querySelector("#emailError").style.display = "inline";
    email.classList.add("input-error");
    isValid = false;
  } else {
    email.classList.remove("input-error");
  }

  // ✅ PASSWORD VALIDATION
  if (passwordValue === "") {
    document.querySelector("#passwordError").textContent =
      "Password is required";
    document.querySelector("#passwordError").style.display = "inline";
    password.classList.add("input-error");
    isValid = false;
  } else if (!passwordRegex.test(passwordValue)) {
    document.querySelector("#passwordError").textContent =
      "Password must contain uppercase, lowercase, number & special character";
    document.querySelector("#passwordError").style.display = "inline";
    password.classList.add("input-error");
    isValid = false;
  } else {
    password.classList.remove("input-error");
  }

  // ✅ SUCCESS
  if (isValid) {
    document.querySelector("#resultMessage").textContent =
      "Everything is correct";
  }
});
});
