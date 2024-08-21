const express = require("express");
const router = express.Router();
const Client = require("../models/clients");

router.get("/", (req, res, next) => {
    let currentRoute = req.originalUrl;
    res.render("register", { title: "PlotPal", currentRoute });
});

router.post("/", async (req, res, next) => {
    const newClient = new Client(req.body);
    const savedClient = await newClient.save();
    console.log(savedClient);
    res.redirect("/");
});

module.exports = router;
