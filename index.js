const SmartPhone = require('./models/smartphone.model');
const express = require("express");
const app = express();

function main() {

    // TODO: get port number from environment variable
    // FIXME: change port immediately
    const PORT = process.env.PORT || 3000;
    
    app.get("/", (req, res) => {
        res.send("Hello world!");
    });

    // TODO: Select smartphones from database
    app.get("/smphns", (req, res) => {
        res.send("smphn1; smphn2; smphn3;");
    });

    // TODO: Move log message to confing
    app.listen(PORT, () => {
        console.log("ExpressJS is running!");
    })
}

if (require.main === module) {
    main();
}