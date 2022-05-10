const express = require('express');
const path = require('path')
const app = express();
const port = 3000

app.listen(port, () => {
    console.log(`Hello World app listening at port:${port}`)
})

const user = {
    firstName: 'Dennis',
    lastName: 'Luangraj'
}

// creating routes
app.get('/', (req, res) => {
    res.render('pages/index', {user:user})
})

// const rangers = {
//     red: 'Jason',
//     green:'Tommy',
//     blue:'Billy',
//     pink:'Kimberly',
//     yellow: 'Trini',
//     black: 'Zack',
//     white: 'Tommy'
// }

// const id = `${id}`
const profile = {
    id: `${user}`
}

app.get('/profile', (req, res) => {
    res.render('pages/profile', {profile:profile})
})

app.get('/register', (req, res) => {
    res.render('pages/register', {register:register})
})

app.get('/login', (req, res) => {
    res.render('pages/login', {login:login})
})

// dynamic routes
app.get('/:id/user', (req, res) => {
    res.send(req.params)
})

// using middleware
app.use(( req, res, next ) => {
     console.log("Timestamp:", Date())
     next()
}, (req, res, next) => {
    console.log(res.statusCode)
    next()
})

// accessing static files with middleware
app.use(express.static(path.join(__dirname, 'public')))

// setting templates
app.set('view engine', 'ejs')