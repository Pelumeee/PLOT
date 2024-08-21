let express = require("express");
const app = express();
const path = require("path");
const formData = require("express-form-data");
const os = require("os");
const fs = require("fs");
const ejsMate = require("ejs-mate");
const mongoose = require("mongoose");

const config = fs.readFileSync(process.env.PLOT_PAL, { encoding: "utf8" });
global["config"] = JSON.parse(config ?? "{}");
let dbUrl = global["config"].dbUrl;

mongoose
    .connect(dbUrl)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((e) => {
        console.log("Error connecting to MongoDB", e);
    });


    
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Set up EJS templating engine
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const options = {
    uploadDir: os.tmpdir(),
    autoClean: true,
};

app.use(express.urlencoded({ extended: true }));

// parse data with connect-multiparty.
app.use(formData.parse(options));
// delete from the request all empty files (size == 0)
app.use(formData.format());
// change the file objects to fs.ReadStream
app.use(formData.stream());
// union the body and the files
app.use(formData.union());

// ======== ROUTES =================================
const indexRouter = require("./routes/index");
app.use("/", indexRouter);

const aboutRouter = require("./routes/about");
app.use("/About", aboutRouter);

const faqRouter = require("./routes/faq");
app.use("/FAQs", faqRouter);

const contactRouter = require("./routes/contact");
app.use("/Contact", contactRouter);

const joinWaitListRouter = require("./routes/register");
app.use("/Join", joinWaitListRouter);

app.listen(global["config"].PORT, () => {
    console.log(`server is running at ${global["config"].PORT}`);
});
