const crypto = require("crypto")

function reviewPassword(password, salt, userHashedPassword) {
    const hash = crypto.pbkdf2(password, salt, 7000, 256, "sha256").toString("hex")
    return hash === userHashedPassword
}

module.exports = reviewPassword