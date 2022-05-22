const bcrypt = require("bcrypt");

module.exports.passwordHashing = async(password) =>{
    return await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS))
}