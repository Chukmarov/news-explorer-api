const express = require('express');

const bodyParser = require('body-parser');
const helmet = require('helmet');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(helmet());

app.listen(PORT, () => {});