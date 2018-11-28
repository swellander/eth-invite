const express = require('express')
const app = express()
const path = require('path')
const db = require('./db')
const PORT = process.env.PORT || 3000

app.use(express.json())

app.use(express.static(path.join(__dirname, '..', 'client/public')));


app.use('/api', (req, res, next) => {
    console.log(req.method, req.url);
    next();
})
app.use('/api', require('./api'))

db.syncAndSeed()

app.listen(PORT, () => {
    console.log('Now listening on port: ', PORT)
})
