const express = require('express');
const dotenv = require('dotenv');
const { connectDB } = require('./src/db')
const { graphqlHTTP } = require('express-graphql');
const schema = require('./src/graphql/schema')
const { authenticate } = require('./src/middleware/auth')
const path = require('path')
const cookieParser = require('cookie-parser')

dotenv.config()

const app = express();
// connecting database
connectDB()

app.use(cookieParser())

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.use(express.urlencoded({ extended: true }))

// app.get('/', (req, res) => {
    //     res.send('Hello World From Twitter Clone')
    // })
    
    // set the view engine to ejs
    app.set('view engine', 'ejs');
    
    // update location of views folder that res.render pulls from
    app.set('views', path.join(__dirname, '/src/templates/views'));
 
    app.use(authenticate)

const user = {
    firstName: 'Dennis',
    lastName: 'Luangraj'
}

app.get('/', (req, res) => {
    res.render('pages/index', {user:user})
})
/* Initialize Routes */
require("./src/routes") // (app)

app.listen(process.env.PORT, () => {
    console.log(`Server now running at port: ${process}`)
})
