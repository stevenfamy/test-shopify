require("dotenv").config();
const express = require("express");
const cors = require("cors");
const compression = require("compression");
const main = ({ router } = require("./app/routes/routes"));

const app = express();
app.use(compression());
app.disable("x-powered-by");

//CORS Settings
app.use(
  cors({
    origin: "*", // restrict calls to those this address
    methods: "*", // only allow GET requests
  })
);

app.use(express.json({ limit: 1000000 }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/", main);

const appPort = 5000;
const server = app.listen(appPort, async () => {
  console.log(`test-shopify`, `Server started at port ${appPort}`);
});

module.exports = { app, server };
