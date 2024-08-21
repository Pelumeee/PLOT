const express = require("express");
const router = express.Router();


router.get("/", (req, res, next) => {
    let currentRoute = req.originalUrl;
    res.render("about", { title: "PlotPal", currentRoute });
});



module.exports = router;
