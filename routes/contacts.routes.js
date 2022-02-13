const {Router} = require('express')
const bodyParser = require('body-parser')
const User = require('../models/User')
const bcrypt = require('bcryptjs')

const router = Router()

router.post('/get', bodyParser.json(), async (req, res) => {
    const data = req.body

    const regExp = new RegExp(data.login)

    const candidates = await User.find({
        login: {
            $regex: regExp
        }
    })

    res.json({
        candidates: candidates
    })
})

router.post('/save', bodyParser.json(), async (req, res) => {
    const data = req.body

    await User.updateOne({login: data.login}, {contacts: data.contacts})

    res.json({
        message: 'All is saved'
    })
})

module.exports = router