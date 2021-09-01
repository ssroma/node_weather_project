const request = require('request');
/*
/ WeatherStack API
/ http://api.weatherstack.com/current
/ 4547ba7eecec951f6e026f6c4c9f3d79
/ access_key
/ http://api.weatherstack.com/current?access_key=4547ba7eecec951f6e026f6c4c9f3d79&query="Itambe"
*/


// Weather Stack API
const WEATHER_STACK_ACCESS_KEY = `4547ba7eecec951f6e026f6c4c9f3d79`;
const location = 'Itambe';
//const weatherStackUrl = `http://api.weatherstack.com/current?access_key=${WEATHER_STACK_ACCESS_KEY}&query=${location}`;

const foreCast = (location, callBack) => {
    const url = `http://api.weatherstack.com/current?access_key=4547ba7eecec951f6e026f6c4c9f3d79&query=${location}`;
    request({url: url, json: true}, (error, response) => {
        if(error){
            callBack(`Something went wrong ${error}`, undefined)
        }else if(response.body.error){
            callBack(response.body.error.info, undefined);
        }else{
            
            callBack(undefined,{"current": response.body.current, "location" : response.body.location });
        }
    });
}

module.exports = foreCast;