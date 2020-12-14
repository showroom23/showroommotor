// Imports
const express = require('express')
const expressLayouts = require('express-ejs-layouts')

const app = express()
const port = 5002

// Static Files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))

// Set Templating Engine
app.use(expressLayouts)
app.set('layout', './layouts/full-width')
app.set('view engine', 'ejs')

// Routes
app.get('/', (req, res) => {
    res.render('index', { title: 'Home Page'})
})

app.get('/index', (req, res) => {
    res.render('index', { title: 'Home Page'})
})


app.get('/honda', (req, res) => {
    res.render('honda', { title: 'Motor Honda'})
})

app.get('/yamaha', (req, res) => {
    res.render('yamaha', { title: 'Motor Yamaha'})
})

app.get('/suzuki', (req, res) => {
    res.render('suzuki', { title: 'Motor Suzuki'})
})

app.get('/kawasaki', (req, res) => {
    res.render('kawasaki', { title: 'Motor Kawasaki'})
})

app.get('/reserve', (req, res) => {
    res.render('reserve', { title: 'Pemesanan'})
})


// Listen on Port 5000
app.listen(port, () => console.info(`App listening on port ${port}`))