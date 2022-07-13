const fs = require('fs');
const express = require('express');
const { exec } = require("child_process");
const { parse } = require('csv');

const sqlite3 = require('sqlite3').verbose()
const sql = require('mssql')

const router = express.Router();


const config = {
    user: 'sa',
    password: 'Pa55w0rd',
    server: 'localhost',
    database: 'SMTPHSSTORE',
    options: {
        trustServerCertificate: true
    }
};

router.post("/writeFileSync/:filename", (req, res, next) => {
    var filetext = "Test text";

    fs.writeFileSync(req.params.filename, filetext);
    res.send("OK").status(201);
});

router.post("/writeFile/:filename", (req, res, next) => {
    const filetext = req.body.text;
    const fileExtention = req.headers['file-extention'];
    const filename = `${req.params.filename}.${fileExtention}`;

    fs.writeFile(filename, filetext, (err) => {
        if (err) {
            throw err;
        }

        res.send("OK").status(201);
    });
});

router.get("/readFileSync/:filename", (req, res, next) => {

    const fileExtention = req.headers['file-extention'];
    const filename = `${req.params.filename}.${fileExtention}`;

    const answer = {
        text: fs.readFileSync(filename).toString()
    };

    res.header("content-type", "application/json").send(answer).status(200);
});

router.get("/readFile/:filename", (req, res, next) => {
    const fileExtention = req.headers['file-extention'];
    const filename = `${req.params.filename}.${fileExtention}`;

    fs.readFile(filename, 'utf-8', (err, data) => {
        if (err) {
            res.status(500);
            throw err;
        }

        const answer = {
            text: data.toString()
        };

        res.header("content-type", "application/json").send(answer).status(200);
    });
});

router.get("/mkdir/:dirname", (req, res, next) => {
    const dirname = req.params.dirname;

    fs.mkdir(dirname, (err) => {
        if (err) {
            res.status(500);
            throw err;
        }

        res.status(201);
    });
});

router.get("/runChildProcess", (req, res, next) => {
    // const command = `awk '{FS=","; OFS=";"} {$5="Android";print $0}' smphns.csv`;
    const command = `mkdir tmp2`;
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            res.status(500);
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            res.status(500);
        }
        console.log(`stdout: ${stdout}`);
        res.send(stdout).status(200);
    });
});

router.get("/getDataFromUnixShell", (req, res, next) => {
    // const command = `awk '{FS=","; OFS=";"} {$5="Android";print $0}' smphns.csv`;
    const command = '/home/user/Projects/js/node_example/run.sh';
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            res.status(500);
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            res.status(500);
        }
        console.log(`stdout: ${stdout}`);
        res.send(stdout).status(200);
    });
});

router.get("/getCSVdata/", (req, res) => {

    fs.readFile('smphns.csv', (err, fileData) => {
        parse(fileData, { columns: true, trim: true }, (err, rows) => {
            console.table(rows);
            res.send(JSON.stringify(rows)).status(200);
        });
    });
});

router.get("/getDataFromSQLite/", (req, res) => {

    const db = new sqlite3.Database('tokens.sqlite3');


    
    db.serialize(() => {
        db.all('SELECT id, uid FROM tokens', (err, rows) => {
            console.table(rows);
            res.send(rows).status(200);
        })
    })

    db.close();

});

router.get("/getDataFromMSSQL/", async (req, res) => {

    try {

            await sql.connect(config);
            // const result = await sql.query`select * from os`;
            const result = await sql.query`select count(*) cnt, os.name 
                                            from smartphones sm, os where sm.os = os.id 
                                            GROUP BY os.name 
                                            ORDER BY cnt DESC`;
            console.table(result.recordset);
            res.send(result.recordset).status(200);
        } catch (err) {
            console.log(err);
            res.status(500);
        }


});

router.post("/insertIntoMSSQL/", async (req, res) => {

    try {

            await sql.connect(config);
            await sql.query`INSERT INTO [SMTPHSSTORE].[dbo].[smartphones] VALUES (2, 'NTX-800', 320, 6, NULL)`;
            res.send('Created').status(201);
        } catch (err) {
            console.log(err);
            res.status(500);
        }

});

module.exports = router;
