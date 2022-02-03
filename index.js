const express = require('express')
const config = require('config')
const path = require('path')
const res = require('express/lib/response')

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
app.get('/:file', (req, res) => {
    if ( /.(png|jpeg|jpg|ico|json|txt)$/.test(req.url) ){
        res.sendFile( path.resolve(__dirname, 'client', 'build', req.params.file) )
    }
})

app.listen(PORT, () => {
    console.log(`Server is working on port ${PORT}`)
})