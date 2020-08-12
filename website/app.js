/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

let baseUrl = 'http://api.openweathermap.org/data/2.5/forecast?zip=';
let apiKey = '&APPID=318e9b3626ec1917fef344eecf817c17';

document.getElementById('generate').addEventListener('click',preAction);

function preAction(event){
    const newZip = document.getElementById('zip').value;
    const feeling = document.getElementById('feelings').value;
    getWatherData(baseUrl,newZip,apiKey)

    .then(function(data){
        console.log(data);
        postWatherData('./Data',{date:newDate,temp:data.list[0].main.temp,content:feeling});
        updatePageInterFace();
    });
};
const getWatherData = async(baseUrl,newZip,apiKey)=>{
    const respons = await fetch(baseUrl+newZip+apiKey);
    try{
        const data = await respons.json();
        return data;
    }catch(error)
    {
        console.log("error",error);
    }
};

const postWatherData = async(url = '',data = {})=>{
    console.log(data);
    const response = await fetch(url,{
        method:'POST',
        credentials:'same-origin',
        headers:{
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(data)
    });
    try {
        const newWeatherDate = await response.json();
        console.log(newWeatherDate);
        return newWeatherDate;
    } catch (error) {
        console.log("error",error);
    }
};


const updatePageInterFace = async() => {
    const request = await fetch('/data');
    try {
        const allWeatherData = await request.json();
        document.getElementById('date').innerHTML = `Date: ${allWeatherData[0].date}`;
        document.getElementById('temp').innerHTML = `temperature: ${allWeatherData[0].temp}`;
        document.getElementById('content').innerHTML = `I feeling: ${allWeatherData[0].content}`;
    } catch (error) {
        console.log("error",error);
    }
};


