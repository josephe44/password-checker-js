// array for leak passwords
const leakPasswords = [
  "123456",
  "password",
  "qwerty",
  "dragon",
  "baseball",
  "abc123",
  "football",
  "monkey",
  "letmein",
  "shadow",
  "master",
];

// timeout before a callback is called

let timeout1;
let timeout2;

// traversing the DOM and getting the input and span using their IDs
let password = document.getElementById("PassEntry");
let strengthBadge = document.getElementById("StrengthDisp");
let btn = document.getElementById("btn");
let username = document.getElementById("username");

// The strong and weak password Regex pattern checker
let strongPassword = new RegExp(
  "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
);
let mediumPassword = new RegExp(
  "((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))"
);

// function to check if username and password are the same
function checkUsername(PasswordParameter) {
  if (username.value === PasswordParameter) {
    strengthBadge.style.backgroundColor = "red";
    strengthBadge.textContent = "Username and Password cannot be the same";
    return;
  }

  if (username.value !== PasswordParameter) {
    strengthBadge.style.backgroundColor = "white";
    strengthBadge.textContent = "";
  }
}

// function to check if the password is in the leakPasswords array
function checkLeak(PasswordParameter) {
  if (leakPasswords.includes(PasswordParameter)) {
    strengthBadge.style.backgroundColor = "red";
    strengthBadge.textContent = "Leaked Password";
    return;
  }
}

function StrengthChecker(PasswordParameter) {
  // We then change the badge's color and text based on the password strength

  if (strongPassword.test(PasswordParameter)) {
    strengthBadge.style.backgroundColor = "green";
    strengthBadge.textContent = "Strong";
  } else if (mediumPassword.test(PasswordParameter)) {
    strengthBadge.style.backgroundColor = "blue";
    strengthBadge.textContent = "Medium";
  } else {
    strengthBadge.style.backgroundColor = "red";
    strengthBadge.textContent = "Weak";
  }
}

// Adding an input event listener when a user types to the  password input
btn.addEventListener("click", () => {
  //The badge is hidden by default, so we show it
  strengthBadge.style.display = "block";
  clearTimeout(timeout1);

  // call all the functions
  StrengthChecker(password.value);
  checkLeak(password.value);
  // checkUsername(password.value);

  timeout1 = setTimeout(() => {
    strengthBadge.style.display = "none";
  }, 2000);

  //Incase a user clears the text, the badge is hidden again
  if (password.value.length !== 0) {
    strengthBadge.style.display != "block";
  } else {
    strengthBadge.style.display = "none";
  }
});

// event listener for the username input
password.addEventListener("input", () => {
  //The badge is hidden by default, so we show it
  strengthBadge.style.display = "block";
  clearTimeout(timeout2);

  checkUsername(password.value);

  timeout2 = setTimeout(() => {
    strengthBadge.style.display = "none";
  }, 2000);
});
