#!/usr/bin/env node

const express = require("express");

const app     = express();

require("./routes/userRoutes")(app);

const PORT    = 5000;

app.listen(PORT, () => {
  console.log(`Server running`);
});