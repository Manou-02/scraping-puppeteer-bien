const express = require('express');
require('dotenv').config();
const cors = require('cors');
const achatsRoutes = require('./src/routes/locations/appartement.routes');


const app = express();
const PORT = process.env.PORT;


app.use(cors());


app.use('/', achatsRoutes)

app.get('/', (req, res) => {
    res.send("aaaaaa");
})


app.listen(PORT, () => {
    console.log(`Server started in ${PORT}`);
});
