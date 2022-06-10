const express = require('express');
const router = express.Router();

router.put("/:id", (req, res) => {
    res.send("smphn1; smphn2; smphn3;");
});

router.delete("/:id", (req, res) => {
    res.send("smphn1; smphn2; smphn3;");
});

module.export = router;