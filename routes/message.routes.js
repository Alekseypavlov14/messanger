const {Router} = require('express')
const bodyParser = require('body-parser')
const User = require('./../models/User')
const Message = require('../models/Message')

const router = Router()

router.post('/send', bodyParser.json(), async (req, res) => {
    const data = req.body

    const message = new Message({
        time: data.time,
        from: data.from,
        to: data.to,
        text: data.text,
        read: false,
        send: true
    })

    const target = await User.findOne({login: data.to})
    const contacts = target.contacts
    const contact = contacts.filter(cont => cont.login === data.from)

    if (contact.length === 0) {
        target.contacts.push({
            login: data.from,
            messages: []
        })

        await target.save()
    }

    message.save()
        .then(savedMessage => {
            res.json({
                message: savedMessage,
                isSaved: true
            })
        })
})

router.post('/get', bodyParser.json(), async (req, res) => {
    const data = req.body

    const incomingMessages = await Message.find({to: data.login})
    const outgoingMessages = await Message.find({from: data.login})

    const messages = incomingMessages.concat(outgoingMessages)

    res.json({
        messages: messages
    })
})

router.post('/get-by-login', bodyParser.json(), async (req, res) => {
    const data = req.body

    const incomingMessages = await Message.find({to: data.user, from: data.contact})
    const outgoingMessages = await Message.find({from: data.user, to: data.contact})

    const messages = incomingMessages.concat(outgoingMessages)

    res.json({
        messages: messages
    })
})

module.exports = router