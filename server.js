const express = require('express');
const dotenv = require('dotenv');
const { connectDB } = require('./src/db')
const { graphqlHTTP } = require('express-graphql');
const schema = require('./src/graphql/schema')

dotenv.config()

const app = express();
// connecting database
connectDB()

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

// app.get('/', (req, res) => {
//     res.send('Hello World From Twitter Clone')
// })
const user = {
    firstName: 'Dennis',
    lastName: 'Luangraj'
}

app.get('/', (req, res) => {
    res.render('pages/index', {user:user})
})

app.listen(process.env.PORT, () => {
    console.log(`Server now running at port: ${process}`)
})