//-------- Create a new date instance dynamically with JS
let date = new Date();
let newDate =
  date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

// ----------------Start Global variables---------------------
const generateBtn = document.getElementById("generate");
// ------------------End Global variables

// -------------------openweather api url--------------------
const url = "https://api.openweathermap.org/data/2.5/weather?zip=";
// ------------------------api key---------------------------
const apiKey = ",us&units=metric&appid=0d9003ce99540f980a4ba3acc599c020";

// -----------------------------main function------------------------------------------------

function requestHandler() {
  // get the zipcode and content by dom from user
  const zipcodeValue = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;

  // check that user added zidcode
  if (zipcodeValue) {
    // if user added zipcode will start getting the data from external api "openweather"
    getData(url, zipcodeValue, apiKey).then((data) => {
      //add fetched data in an object
      const info = {
        date: newDate,
        temp: data.main.temp,
        content: feelings,
      };
      // console.log(info);

      // post data to the local serever
      postData(`${port}`, info);

      //update the html with the data fitched from the server
      update();
    });
  } else {
    // if there is no value inside the zipcode will raise a message to reminde him
    document
      .getElementById("zip")
      .setAttribute("placeholder", "  you forgot to add the zipcode here");
  }
}
// -------------------------------------end main function--------------------------------

// -------------------------------------get function-----------------------------------
const getData = async function (url, zipcodeValue, apiKey) {
  // fetch data from the url
  const response = await fetch(url + zipcodeValue + apiKey);

  try {
    // get the data in a json type
    const newData = await response.json();
    // if there is error will show a message to use.
    if (response.status >= 400) {
      const hint = document.getElementById("hint");
      hint.style.display = "block";
      hint.innerHTML = response.statusText;
      // throw the response to catch error
      throw response;
    }
    // if no error will return the responsed data
    return newData;

    // catch the errors
  } catch (error) {
    console.log("Error:", error);
  }
};

// create a post function which post the given data to the given url
const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  try {
    // convert the data to json
    if (response.status >= 400) {
      const resData = await response.json();
      // console.log("error");
      throw resData;
    }

    return resData;
    // catch the errors
  } catch (error) {
    console.log("error", error);
  }
};

// build a function to update the html
const update = async () => {
  // get the html elements .
  const date = document.getElementById("date");
  const temp = document.getElementById("temp");
  const content = document.getElementById("content");
  // delete the old values in the elements after getting the new data
  document.getElementById("zip").value = "";
  document.getElementById("feelings").value = "";
  // fetch data from server "projectData"
  const response = await fetch("http://localhost:3000/allData");
  const projectData = await response.json();
  try {
    if (response.status >= 400) {
      throw response.json();
    } else {
      // update elements with new data.
      date.innerHTML = projectData.date;
      temp.innerHTML = projectData.temp;
      content.innerHTML = projectData.content;
    }
  } catch (error) {
    console.log(error);
  }
};

// with clicking on the generate button will apply function requestHandler
generateBtn.addEventListener("click", requestHandler);
