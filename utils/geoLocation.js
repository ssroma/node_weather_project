const request = require('request');

const geoLocationCode = (location, params, callBack) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1Ijoic2VyZ2lvcm9tYSIsImEiOiJja3NzMGxxbzAwcnFpMndvZGczYnVhZmJlIn0.hcqXX78YDm8HD6jUaAr79g&limit=${params}`;

    request({url: url, json: true }, (error, response) => {
        if(error){
            callBack(`Something went wrong ${error}`, undefined)
        }else if(response.body.features.length === 0){
             callBack(`Sorry, Place not found. Try a new Search`, undefined);
        }else{
            callBack(undefined, {
                "latitude" : response.body.features[0].center[1],
                "longitude" : response.body.features[0].center[0],
                "location" : response.body.features[0].place_name
            })
        }
    });
}

module.exports = geoLocationCode;