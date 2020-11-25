const express = require('express');
const itemRoutes = require('./itemRoutes');

const app = express();
app.use(express.json());
app.use('/items', itemRoutes);

module.exports = app;
