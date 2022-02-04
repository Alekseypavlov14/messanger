const express = require('express')
const config = require('config')
const path = require('path')
const bcrypt = require('bcryptjs')

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

app.use('/server', require('./routes/account.routes'))

app.listen(PORT, () => {
    console.log(`Server is working on port ${PORT}`)
})