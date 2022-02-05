async function register(login, password) {
    return fetch('/server/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            login: login,
            password: password
        })
    }).then(response => {
        return response.json()
    }).then(data => {
        localStorage.setItem('login', data.login)
        localStorage.setItem('password', data.password)
    }).catch(e => {
        console.log(e)
        return null
    })
}

export default register