function validLogin(login) {
    if ( /\w{4,}/.test(login) ) {
        return true
    }

    return false
}

function validPassword(password) {
    if ( /\w{6,}/.test(password) ) {
        return true
    }

    return false
}

export const valid = {
    login: validLogin,
    password: validPassword
}