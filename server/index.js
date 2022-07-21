const express = require("express");
const path = require("path");
require("dotenv").config();

const PORT = process.env.PORT || 3001;

const app = express();

//Have Node serve the files for out built React app
app.use(express.static(path.resolve(__dirname, "../client/build")));

//api calls
app.get("/api", (_req, res) => {
  // use secret api keys with process.env.MY_SECRET_FAKE_API_KEY
  res.json({
    message: `I shouldn't be showing you this ${process.env.MY_SECRET_FAKE_API_KEY}`,
  });
});

// All other GET requests not handled before will return out React app
app.get("*", (_req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
