#!/usr/bin/env node
const express    = require("express");
const app        = express();
const bodyParser = require("body-parser");
const PORT       = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
require("./routes/userRoutes")(app);//faire attention des declaration dans l'ordre

app.listen(PORT, () => {
  console.log(`Server running`);
});

