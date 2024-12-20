const express = require('express');

const app = express();

const port = 2612;

app.set('view engine', 'ejs')

app.use(express.urlencoded());

app.use('/', require('./routes/movieRoute'));

const db = require('./config/db');

const path = require('path');

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.get('/', (req, res) => {
    return res.render('index');
})

app.listen(port, () => {


    console.log(`Server Start at http://localhost:${port}`);
})