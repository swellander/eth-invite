const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 4000;

const publicPath = path.resolve(__dirname, '..', 'client', 'public')
app.use(express.static(publicPath));

app.listen(port, () => console.log(`Listening on port ${port}`));