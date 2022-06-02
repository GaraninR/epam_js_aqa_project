const SmartPhone = require('./models/smartphone.model');
const express = require("express");
const app = express();

function main() {

    app.get("/", (req, res) => {
        res.send("Hello world!");
    });

    app.get("/smphns", (req, res) => {
        res.send("smphn1; smphn2; smphn3;");
    });

    app.listen(3000, () => {
        console.log("ExpressJS is running!");
    })
}

if (require.main === module) {
    main();
}