const express = require('express');
const itemRoutes = require('./itemRoutes');

const app = express();
app.use(express.json());
app.use('/items', itemRoutes);

app.listen(3000, () => {
    console.log('Listening on port 3000');
});