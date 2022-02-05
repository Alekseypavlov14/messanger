function valid(login, password) {
    const loginResult = !!(login?.length >= 4)
    const passwordResult = !!(password?.length >= 6)

    if (loginResult && passwordResult) {
        return true
    }

    return false
}

export default valid