const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/aac4c6fcbfa7eb4e1edbae338ccce189/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)
    request({url : url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather services', undefined)
        }else if(body.error){
            callback('Unable to find weather.', undefined)
        }else{
            callback(undefined, body.daily.data[0].summary + ' Chances of rain are : ' + body.currently.precipProbability + ' Temperature is ' + body.currently.temperature)
        }

    })
}

module.exports = forecast

