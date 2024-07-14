const express = require('express');
const app = express();
const tasks = require('./task.json').tasks;
const routes = require('./routes');
const PORT = 3000;
app.use(express.json());
app.use('/api', routes);

app.listen(PORT, () => {
    console.log('Server is listening on ', PORT);
})

