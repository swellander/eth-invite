const express = require('express')
const app = express()
const path = require('path')
const db = require('./db')
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.static(path.join(__dirname, '..', 'client/public')));
app.use('/api', require('./api'))

const init = () => {
    db.syncAndSeed()
        .then(() =>
            app.listen(PORT, () => {
                console.log('Now listening on port: ', PORT)
            })
        )
        .catch(err => console.log(err))
}

init();
