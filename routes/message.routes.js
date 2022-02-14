const {Router} = require('express')
const bodyParser = require('body-parser')
const User = require('./../models/User')
const Message = require('../models/Message')

const router = Router()

router.post('/send', bodyParser.json(), async (req, res) => {
    const data = req.body

    // get target user
    const userTo = await User.findOne({login: data.to})

    res.json({
        message: userTo
    })
})

module.exports = router