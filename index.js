const SmartPhone = require('./models/smartphone.model');
const express = require("express");
const app = express();
const router = require("./routes/smrtphs");

function main() {

    // TODO: get port number from environment variable
    // FIXME: change port immediately
    const PORT = process.env.PORT || 3000;
    app.use("/smphns", router);

    app.listen(PORT, () => {
        console.log("ExpressJS is running!");
    })
}

if (require.main === module) {
    main();
}