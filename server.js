const express = require('express');
const app = express();
const port = 8080;
const canvas = require('./canvas');

// app.use(express.static('public'));
app.get('/', (req, res) => {
    canvas(res);
})

app.listen(port, () => console.log(`Listening on port ${port}!`));