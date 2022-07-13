const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.send("smphn1; smphn2; smphn3;");
});

router.post("/", (req, res) => {
    res.send("smphn1; smphn2; smphn3;");
});

router.get("/:id", (req, res) => {
    res.send("smphn1; smphn2; smphn3;");
});

router.delete("/:id", (req, res) => {
    res.send("smphn1; smphn2; smphn3;");
});

module.export = router;
