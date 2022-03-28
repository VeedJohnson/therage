
//validating the registration form
const userForm = document.querySelector(".reg-form");
const userInput = Array.from(document.querySelectorAll(".user-input"));
const userEmail = document.querySelector("#user-email");
const errorText = document.querySelector("#error-text");
const userPassword = document.querySelector("#user-password");
const confirmPassword = document.querySelector("#check-password");
const userPhone = document.querySelector("#user-phone");
const passwordRule = document.querySelector("#password-rule");

//to monitor if all form inputs have been filled right
let emailState = true;
let passwordState = true;
let checkpassState = true;
let phoneState = true;
let inputState = true;

//function to add error message
const errorShow = (errorMessage) => {
  errorText.classList.remove("hidden");
  errorText.innerHTML = errorText.innerHTML + `${errorMessage}`;
};

//function to hide error message
const errorHide = () => {
  errorText.classList.add("hidden");
  errorText.innerHTML = "";
};


//check for email validation after input
userEmail.onblur = (e) => {
  if (
    userEmail.value.match(
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    )
  ) {
    emailState = true;
  } else {
    emailState = false;
  }
};

//check for password validation
userPassword.onkeyup = () => {
  //show the password rule when the user hits a key
  passwordRule.classList.replace("hide-me", "show-me");

  //to check for the length of the password
  if (userPassword.value.length >= 6) {
    document.getElementById("lengthIcon").setAttribute("class", "fas fa-check");
    document.getElementById("length").style.color = "initial";
    passwordState = true;
  } else {
    document.getElementById("lengthIcon").setAttribute("class", "fas fa-times");
    document.getElementById("length").style.color = "red";
    passwordState = false;
  }
};

//remove the password rule when the user clicks outside the input
userPassword.onblur = () => {
    passwordRule.classList.replace("show-me", "hide-me");
};

//Check if confirm password matches the initial password
confirmPassword.onblur = () => {
  if (confirmPassword.value !== userPassword.value) {
    errorShow(`<p>Password does not match!</p>`);
    setTimeout(() => {
      errorHide();
    }, 4000);
    checkpassState = false;
  } else {
    checkpassState = true;
  }
};

userForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //check for empty input
  userInput.forEach((input) => {
    if (input.value === "") {
      inputState = false;
    } else inputState = true;
  });

  if ( inputState & emailState & passwordState & checkpassState & userPhone.value.length >= 10) {
    document.getElementById("reg-form").submit();
  } else {
    errorShow(`<p>Kindly fill out all fields correctly</p>`);
    setTimeout(() => {
      errorHide();
    }, 4000);
  }
});