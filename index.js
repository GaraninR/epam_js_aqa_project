const SmartPhone = require('./models/smartphone.model');
const express = require("express");
const app = express();
const router = require("./routes/smrtphs");

function main() {

    const PORT = process.env.PORT || 3000;

    app.use(express.json());
    app.use("/smphns", router);

    app.listen(PORT, () => {
        console.log("ExpressJS is running!");
    })
}

if (require.main === module) {
    main();
}