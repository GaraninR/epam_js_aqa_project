const express = require("express");
const app = express();
const router = require("./routes/smrtphs");
const routerTokens = require("./routes/tokens");

function main() {

    const PORT = process.env.PORT || 3000;

    app.use(express.json());
    app.use("/token", routerTokens);
    app.use("/smphns", router);
    
    
    app.listen(PORT, () => {
        console.log("ExpressJS is running!");
    })
}

if (require.main === module) {
    main();
}