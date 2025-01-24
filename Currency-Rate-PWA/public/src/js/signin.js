const signinForm = document.forms.signinForm
const googleSigninForm = document.forms.googleSigninForm
const githubSigninForm = document.forms.githubSigninForm

document.addEventListener("submit", function(event) {
    event.preventDefault()
    console.log("event.target", event.target)
    switch(event.target) {
        case signinForm:
            return customSignin()
        case googleSigninForm:
            return googleSignin()
        case githubSigninForm:
            return githubSignin()
        default:
            return
    }
})

async function customSignin() {

    // const { email, password } = signinForm.elements

    // let data

    // const enteredEmail = email.value
    // const enteredPassword = password.value
    
    // console.log("email", enteredEmail, "password", enteredPassword)

    // try {

    //     data = await fetch("http://localhost:3001/signon", {
    //         method: 'POST',
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({
    //             userEmailOrUsername: enteredEmail,
    //             enteredPassword: enteredPassword
    //         })
    //     })
    
    //     let response = await data.json()
    //     console.log("response", response)
    // } catch (error) {
    //     console.log("error", error)
    // }
}

async function googleSignin() {

}

async function githubSignin() {

}