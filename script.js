const emailInput = document.getElementById("email")
const passwordInput = document.getElementById("password")
const confirmPassowrd = document.getElementById("confirm-password")
const submitForm = document.getElementById("submit-form")
const logoutButton = document.getElementById('logout-button')
const errorMessage = document.getElementById('error-message')
const emailError = document.getElementById('email-error')
const passwordError = document.getElementById('password-error')
const confirmError = document.getElementById('confirm-error')
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;


// to show password
function showPassword() {
  passwordInput;
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
    } else {
      passwordInput.type = "password";
    }
  }

submitForm.addEventListener("submit", function(e) {
    e.preventDefault()
    console.log('submitted');

//   validation for email
if (emailInput.value === '') {
    emailError.textContent = "enter your email"
} 
    
//  validate password
if (passwordInput.value === '') {
    passwordError.textContent = 'enter your password'
    } else if  (!passwordInput.value.match(passwordPattern)) {
        console.log('Password validation failed');
        passwordError.textContent = 'Password must have at least one uppercase letter, one lowercase letter, one number, and one special character';
}

// validate confirm passowrd
if (confirmPassowrd.value === '') {
     confirmError.textContent = 'enter confirm password'
} else if (confirmPassowrd.value !== passwordInput.value) {
    console.log('password do not match'); 
    errorMessage.textContent = 'password do not match'
    logoutButton.classList.add('hidden')
}

// submit onValidation
if  (emailInput.value && passwordInput.value && confirmPassowrd.value && passwordInput.value === confirmPassowrd.value) {
    alert('you are successfully logged in')
    showWelcomeMessage(emailInput.value);
    logoutButton.classList.remove('hidden')
    localStorage.setItem('loggedInEmail', emailInput.value); 
}

})

//to remove the error message on input
emailInput.addEventListener('input', function () {
    emailError.textContent = ''
})

passwordInput.addEventListener('input', function () {
    passwordError.textContent = ''
})

confirmPassowrd.addEventListener('input', function () {
    confirmError.textContent =  ''
})


// login successful text
function showWelcomeMessage(email) {
    submitForm.style.display = 'none';
    const welcomeMessage = document.createElement('h2');
    welcomeMessage.textContent = `Welcome to your account, ${email}`;
       
    document.body.innerHTML = '';
    document.body.appendChild(welcomeMessage); 
    document.body.appendChild(logoutButton)
    logoutButton.classList.remove('hidden')

    
}

// show welcome message in on reload 
document.addEventListener("DOMContentLoaded", function(e) {
    e.preventDefault()
    const loggedInEmail = localStorage.getItem('loggedInEmail');
    if (loggedInEmail) {
        showWelcomeMessage(loggedInEmail);
    }
});


 // Logout 
 logoutButton.addEventListener('click', function(e) {
    e.preventDefault()
    localStorage.removeItem('loggedInEmail');
    window.location.reload(); 
});