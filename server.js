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

// get the file
// app.get("/add", (req, res) => {
//   // console.log(__dirname + "/website/index.html");
//   // res.sendFile(__dirname + "/website/index.html");
// });

app.use(express.static(__dirname + "/website"));

// send the home
app.get("/", (req, res) => {
  // send html file at path "/add"
  res.sendFile(__dirname + "/website/index.html");
});

// send data to the update function in clinet side to update the client side
app.get("/allData", (req, res) => {
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
