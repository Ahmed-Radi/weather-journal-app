// Setup empty JS object to act as endpoint for all routes
projectData = [];

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 400;
const server = app.listen(port, listening);

function listening(){
    console.log(`server running on port : ${port}`);
}

app.get('/allDate',sendData);

function sendData(requestData,responseData){
    responseData.send(projectData);
    //projectData = [];
}

app.post('./Data',addData);

function addData(requestData,responseData){
    //const data = requestData.body;
    console.log('server Side data',data);
    newData = {
        date:requestData.body.date,
        temp:requestData.body.temp,
        content:requestData.body.content
    }
    projectData.push(newData);
}