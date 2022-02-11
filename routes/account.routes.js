const {Router} = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs')
const User = require('./../models/User')

const router = Router()

router.post('/register', bodyParser.json(), async (req, res) => {
    const data = req.body

    // hashed login and password
    const login = await bcrypt.hash(data.login, 7)
    const password = await bcrypt.hash(data.password, 7)

    // get all users
    const users = await User.find({})
    // filter by login
    const candidates = users.filter(user => {
        return bcrypt.compareSync(data.login, user.login)
    })

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

    const savedUser = await user.save()
    
    res.json({
        login: login,
        password: password,
        user: savedUser
    })
})

router.post('/login', bodyParser.json(), async (req, res) => {
    const data = req.body

    // get all users
    const users = await User.find({})

    // filter by login and password
    const candidates = users.filter(user => (
        bcrypt.compareSync(data.login, user.login) &&
        bcrypt.compareSync(data.password, user.password)
    ))

    if (candidates.length == 0) {
        return res.json({
            message: 'Incorrect login or password'
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