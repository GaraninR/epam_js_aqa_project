const express = require('express');
const router = express.Router();
const sql = require('mssql');
const axios = require('axios');

const config = {
    user: 'sa',
    password: 'Pa55w0rd',
    server: 'localhost',
    database: 'SMTPHSSTORE',
    options: {
        trustServerCertificate: true
    }
}

router.get("/", async (req, res, next) => {

    const token = req.headers['token']

    console.log(token);

    if (!token) {
        res.send('Unauthorized').status(401);
        return;
    }

    try {
        await sql.connect(config);
        const result = await sql.query(`select sm.model, sm.weight, sm.owner, sm.manufacturer, sm.os_name from dbo.smphns sm`);
        console.table(result.recordset);
        res.send(result.recordset).status(200);

    } catch (err) {
        console.log(`Error ${err}`);
        res.status(500);
    }

});

router.post("/", async (req, res) => {

    const token = req.headers['token']

    console.log(token);

    if (!token) {
        res.send('Unauthorized').status(401);
        return;
    }

    const manufacturerId = req.body.manufacturerId;
    const model = req.body.model;
    const weight = req.body.weight;
    const osId = req.body.osId;
    const owner = req.body.owner;

    if (!owner) owner = 'NULL';

    try {
        await sql.connect(config);
        await sql.query(`INSERT INTO [SMTPHSSTORE].[dbo].[smartphones] VALUES (${manufacturerId}, '${model}', ${weight}, ${osId}, ${owner});`);
        res.status(201).send('Created');

    } catch (err) {
        res.send(500);
        console.log(`Error ${err}`);
    }
});

router.get("/:id", async (req, res) => {

    const token = req.headers['token']

    console.log(token);

    if (!token) {
        res.send('Unauthorized').status(401);
        return;
    }

    try {
        const id = req.params.id;
        await sql.connect(config);
        const result = await sql.query(`select sm.model, sm.weight, sm.owner, sm.manufacturer, sm.os_name from dbo.smphns sm WHERE sm.id = ${id}`);
        console.table(result.recordset);
        res.send(result.recordset).status(200);

    } catch (err) {
        console.log(`Error ${err}`);
        res.status(500).send(err);
    }
});

router.put("/:id", async (req, res) => {

    const token = req.headers['token']

    console.log(token);

    if (!token) {
        res.send('Unauthorized').status(401);
        return;
    }

    const id = req.params.id;
    const manufacturerId = req.body.manufacturerId;
    const model = req.body.model;
    const weight = req.body.weight;
    const osId = req.body.osId;
    const owner = req.body.owner;

    if (!owner) owner = 'NULL';

    try {
        await sql.connect(config);
        await sql.query(`UPDATE [SMTPHSSTORE].[dbo].[smartphones] SET manufacturer=${manufacturerId}, model='${model}', weight=${weight}, os=${osId}, owner=${owner} WHERE id = ${id}`);
        res.status(201).send();

    } catch (err) {
        console.log(`Error ${err}`);
        res.status(500).send(err);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        await sql.connect(config);
        await sql.query(`DELETE FROM [SMTPHSSTORE].[dbo].[smartphones] WHERE id = ${id}`);
        res.status(204).send('Deleted');

    } catch (err) {
        console.log(`Error ${err}`);
        res.status(500).send(err);
    }
});

router.get("/:id/owner", async (req, res) => {

    const token = req.headers['token']

    const id = req.params.id;

    if (!token) {
        res.send('Unauthorized').status(401);
        return;
    }

    try {

        let headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)" 
           }
           
           let reqOptions = {
             url: `http://localhost:8001/getOwner/${id}`,
             method: "GET",
             headers: headersList,
           }
           
           axios.request(reqOptions).then(function (response) {
             console.log(response.data);
             res.status(200).send(response.data);
           })

    } catch (err) {
        console.log(`Error ${err}`);
        res.status(500).send(err);
    }
});

module.exports = router;
