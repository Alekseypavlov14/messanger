function validLogin(login) {
    if (login?.length >= 4) {
        return true
    }

    return false
}

function validPassword(password) {
    if (password?.length >= 6) {
        return true
    }

    return false
}

export const valid = {
    login: validLogin,
    password: validPassword
}