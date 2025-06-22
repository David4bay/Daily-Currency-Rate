const registerOrSignIn = document.getElementById("signOrRegister")

registerOrSignIn.addEventListener("click", function(event) {
    event.preventDefault()
    console.log(event.target)
}, true)