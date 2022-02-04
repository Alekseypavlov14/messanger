const {Router} = require('express')
const bodyParser = require('body-parser')

const router = Router()

router.post('/login', bodyParser.json(), async (req, res) => {
    const data = req.body

    const login = data.login
    const password = data.password

    res.json({
        login: login,
        password: password
    })
})

module.exports = router