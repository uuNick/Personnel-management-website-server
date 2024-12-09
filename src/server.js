require("dotenv").config();
const express = require('express');
const cors = require('cors');
const sequelize = require("./db");

const port = process.env.SERVER_PORT;
const app = express()

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(express.json());

const start = async () => {
    try {
        await sequelize.authenticate();
        //await syncModels();
        //await seedDatabase();

        app.listen(port, () => console.log(`Server listening on port ${port}`));
    } catch (e) {
        console.log(e);
    }
};

start();