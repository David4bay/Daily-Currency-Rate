const crypto = require("crypto")

function convertPassword(password) {
    const salt = crypto.randomBytes(128).toString("hex")
    
    const hash = crypto.pbkdf2Sync(password, salt, 7000, 256, "sha256").toString('hex')
    
    return { salt, hash }
}

module.exports = convertPassword