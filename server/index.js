const express = require('express');
const path = require('path');
const expressGraphQL = require('express-graphql');
const app = express();
const port = process.env.PORT || 4000;
const schema = require('./schema')
const db = require('./db');

//graphql middleware
app.use('/graphql', expressGraphQL({
  graphiql: true,
  schema
}))

const publicPath = path.resolve(__dirname, '..', 'client', 'public')
app.use(express.static(publicPath));

const init = () => {
  db.sync()
    .then(() => app.listen(port, () => console.log(`Listening on port ${port}`)))
}

init();
