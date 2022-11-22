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
let showPassword = document.getElementById("showPassword");

// The strong and weak password Regex pattern checker
let strongPassword = new RegExp(
  "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
);
let mediumPassword = new RegExp(
  "((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))"
);

// function to check if the password is in the leakPasswords array
function checkLeak(PasswordParameter) {
  if (leakPasswords.includes(PasswordParameter)) {
    strengthBadge.style.backgroundColor = "red";
    strengthBadge.textContent = "Leaked Password ";
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
password.addEventListener("input", () => {
  // show password from the input
  showPassword.textContent = password.value;

  //The badge is hidden by default, so we show it
  strengthBadge.style.display = "block";
  clearTimeout(timeout1);
  clearTimeout(timeout2);

  //We then call the StrengChecker function as a callback then pass the typed password to it

  timeout1 = setTimeout(() => StrengthChecker(password.value), 500);
  timeout2 = setTimeout(() => checkLeak(password.value), 500);

  //Incase a user clears the text, the badge is hidden again

  if (password.value.length !== 0) {
    strengthBadge.style.display != "block";
  } else {
    strengthBadge.style.display = "none";
  }
});
