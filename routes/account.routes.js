const {Router} = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const User = require('./../models/User')

const router = Router()

router.post('/register', bodyParser.json(), async (req, res) => {
    const data = req.body

    const login = await bcrypt.hash(data.login, 7)
    const password = await bcrypt.hash(data.password, 7)

    const users = await User.find({})
    const candidates = users.filter(user => bcrypt.compare(login, user.login))

    if (candidates.length > 0) {
        return res.json({
            message: 'This user is already registered'
        })
    }

    const user = new User({
        login: login,
        password: password,
        contacts: []
    })

    user
        .save()
        .then(savedUser => {
            res.json({
                login: login,
                password: password,
                user: savedUser
            })
        })
        .catch(e => console.log(e))
})

router.post('/login', bodyParser.json(), async (req, res) => {
    const data = req.body

    const login = await bcrypt.hash(data.login, 7)
    const password = await bcrypt.hash(data.password, 7)

    const users = await User.find({})
    const candidates = users.filter(user => (
        bcrypt.compare(login, user.login) &&
        bcrypt.compare(password, user.password)
    ))

    if (candidates.length == 0) {
        return res.json({
            message: 'There is no such account'
        })
    }

    const foundUser = candidates[0]

    return res.json({
        login: foundUser.login,
        password: foundUser.password,
        user: foundUser
    })
})

module.exports = router