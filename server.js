// require packages needed
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const port = 3000;
//create an instance of express and name it app
const app = express();

// create an object
const projectData = {};

//use cors backage
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

// middleware
// build a get request
app.get("/", (req, res) => {
  //  projectData as endpoint API
  res.send(projectData);
});

// add a host to start  runnning the server
app.listen(port, () => {
  console.log(`SERVER IS RUNNING AT PORT ${port}`);
});
