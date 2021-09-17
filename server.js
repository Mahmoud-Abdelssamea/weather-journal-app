// require packages needed
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const port = 3000;
//create an instance of express and name it app
const app = express();

// create an object
const projectData = [];

//use cors backage
app.use(cors());

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// build a get request
app.get("/add", (req, res) => {
  //  projectData as endpoint API
  res.send(projectData);
});

// post request
app.post("/add", (req, res) => {
  console.log(req.body);
  // add all reqested data in an object.
  newEntry = {
    date: req.body.date,
    temp: req.body.temp,
    content: req.body.content,
  };
  // push the object in array projectData.
  projectData.push(newEntry);
  console.log(projectData);
});

// add a host to start  runnning the server
app.listen(port, () => {
  console.log(`SERVER IS RUNNING AT PORT ${port}`);
});
