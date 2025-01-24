const registrationForm = document.forms.registrationForm

registrationForm.addEventListener('submit', async function(e) {
    const { email, password } = registrationForm.elements

    const emailInput = email.value
    const passwordInput = password.value

    console.log("email", emailInput, "password", passwordInput)
})