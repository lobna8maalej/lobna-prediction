const express = require("express");
const router = express.Router();

const { predict } = require("../service/predictService");

router.post("/", async (req, res) => {

    console.log("BODY:", req.body);

    try {

        const result = await predict(req.body.features);

        res.json(result);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            error: error.toString()
        });

    }
});

module.exports = router;