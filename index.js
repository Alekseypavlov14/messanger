const express = require('express')
const config = require('config')
const path = require('path')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')

const db = config.get('db') || 'mongodb+srv://aleksey:messager2022@messager.noce0.mongodb.net/messager?retryWrites=true&w=majority'

mongoose.connect(
    db, 
    { useUnifiedTopology: true, useNewUrlParser: true },
    () => console.log('Connected with DB')
)

// getting port
const PORT = config.get('port') || 20022
// create app on express
const app = express()

// getting home page
app.get('/', (req, res) => {
    res.sendFile( path.join(__dirname, 'client', 'build', 'index.html') )
})

// getting static files (css, js, media)
app.use('/static', express.static(path.resolve(__dirname, 'client', 'build', 'static')))

// getting other public files
app.get('/files/:file', (req, res) => {
    res.sendFile( path.resolve(__dirname, 'client', 'build', 'files', req.params.file) )
})

app.get('/login', (req, res) => {
    res.sendFile( path.join(__dirname, 'client', 'build', 'index.html') )
})

app.get('/register', (req, res) => {
    res.sendFile( path.join(__dirname, 'client', 'build', 'index.html') )
})

app.get('/home', (req, res) => {
    res.sendFile( path.join(__dirname, 'client', 'build', 'index.html') )
})

app.get('/home/main', (req, res) => {
    res.sendFile( path.join(__dirname, 'client', 'build', 'index.html') )
})

app.get('/home/add', (req, res) => {
    res.sendFile( path.join(__dirname, 'client', 'build', 'index.html') )
})

app.get('/home/chat', (req, res) => {
    res.sendFile( path.join(__dirname, 'client', 'build', 'index.html') )
})

app.use('/server', require('./routes/account.routes'))

app.use('/message', require('./routes/message.routes'))

app.use('/contacts', require('./routes/contacts.routes'))

app.listen(PORT, () => {
    console.log(`Server is working on port ${PORT}`)
})