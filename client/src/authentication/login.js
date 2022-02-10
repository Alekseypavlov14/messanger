async function login(login, password) {
    return fetch('/server/login', {
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

export default login