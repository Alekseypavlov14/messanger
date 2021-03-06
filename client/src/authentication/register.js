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
    })
}

export default register