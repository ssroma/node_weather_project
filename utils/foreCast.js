const request = require('request');

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