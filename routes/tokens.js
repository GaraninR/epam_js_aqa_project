const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('tokens.sqlite3');

router.get("/", (req, res) => {
    
    const username = req.headers.username;
    const password = req.headers.password;

    if (!(username) || !password) {
        res.send('Unauthorized').status(401);
        return;
    }

    console.log(`${username} is logged with ${password}`);
    
    db.serialize(() => {
        db.each('SELECT uid FROM tokens LIMIT 1;', (err, row) => {
            if(!err) {
                res.send(row).status(200);
            }
        });
    });

});

module.exports = router;
