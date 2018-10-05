var assert = require('assert');
module.exports = {
    UsernameIsValid: UsernameIsValid,
    PasswordIsValid: PasswordIsValid
}
function UsernameIsValid(username){
    const nameregex = /^[a-zA-Z\-0-9].{3,20}$/;
   
    return username.match(nameregex)!==null;
}
function PasswordIsValid(password){
    const passwordregex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return password.match(passwordregex)!==null;
    
}
