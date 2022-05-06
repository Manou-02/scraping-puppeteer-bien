const express = require('express');
require('dotenv').config();
const cors = require('cors');
const achatsRoutes = require('./src/routes/locations/appartement.routes');
const locationBienici = require('./src/routes/bienici/location.routes');


const app = express();
const PORT = process.env.PORT;


app.use(cors());


app.use('/', achatsRoutes)


app.use('/bienici', locationBienici);

app.get('/', (req, res) => {
    res.send("aaaaaa");
})


app.listen(PORT, () => {
    console.log(`Server started in ${PORT}`);
});
