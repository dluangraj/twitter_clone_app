const express = require('express');
const dotenv = require('dotenv');
const { graphqlHTTP } = require('express-graphql');
const path = require('path');

const { connectDB } = require('./src/db');
const schema = require('./src/graphql/schema');
const { authenticate } = require('./src/middleware/auth');
const { userData } = require('./src/middleware/userData');

const cookieParser = require('cookie-parser');

dotenv.config();

const app = express();

connectDB();


// set the view engine to ejs
app.set('view engine', 'ejs');

// update location of views folder that res.render pulls from
// app.set('views', path.join(__dirname, '/src/templates/views'));
app.set('views', path.join(__dirname, '/src/templates/views'));

app.use(cookieParser());
app.use(authenticate);
app.use(userData);

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}));

app.use(express.urlencoded({ extended: true }));

/* Initialize Routes */
require("./src/routes")(app);

app.listen(process.env.PORT, () => {
    console.log(`Server now running on PORT ${process.env.PORT}`)
});














