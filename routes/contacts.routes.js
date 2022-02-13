const {Router} = require('express')
const bodyParser = require('body-parser')
const User = require('../models/User')

const router = Router()

router.post('/find', bodyParser.json(), (req, res) => {
    res.json({
        data: 'Success'
    })
})

module.exports = router