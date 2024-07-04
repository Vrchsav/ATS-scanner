const express = require("express");
const app = express();
const pdfParser = require("pdf-parse");
const fileUpload = require("express-fileupload");

app.use(express.json());
app.use(fileUpload());
const cors = require('cors')
app.use(cors()) 
const extract  = require("./routes/primary");
app.use("/api", extract);

app.listen(3000, () => console.log("Server started on port 3000"));
