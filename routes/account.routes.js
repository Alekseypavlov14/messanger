const {Router} = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')

const router = Router()

router.post('/register', bodyParser.json(), async (req, res) => {
    const data = req.body

    const login = await bcrypt.hash(data.login, 7)
    const password = await bcrypt.hash(data.password, 7)

    res.json({
        login: login,
        password: password
    })
})

module.exports = router