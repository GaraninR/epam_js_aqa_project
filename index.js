const SmartPhone = require('./models/smartphone.model');
const express = require("express");
const app = express();
app.use(express.json());
const router = require("./routes/smrtphs");
const routerFS = require("./routes/filesystem")
const routerDB = require("./routes/databases")

function main() {

    // TODO: get port number from environment variable
    // FIXME: change port immediately
    const PORT = process.env.PORT || 3000;
    app.use("/smphns", router);
    app.use("/fs", routerFS);
    app.use("/db", routerDB);

    app.listen(PORT, () => {
        console.log("ExpressJS is running!");
    })
}

if (require.main === module) {
    main();
}