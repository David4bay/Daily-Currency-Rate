

const signinForm = document.forms.signinForm

signinForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    const { email, password } = signinForm.elements

    const enteredEmail = email.value
    const enteredPassword = password.value

    console.log("email", enteredEmail, "password", enteredPassword)


    fetch("http://localhost:3001/signon", {
        method: "POST",
        body: {
            userEmailOrUsername: enteredEmail,
            enteredPassword: enteredPassword
        }
    }).then(function(response) {
        console.log("response", response)
    }).catch(function(error) {
        console.log("error", error)
    })
})