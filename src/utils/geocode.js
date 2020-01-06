const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWthc2hyYW0xOTk1IiwiYSI6ImNrNHF1cmxucjBrNzczZ3A0c3NidmR3YTEifQ.0eDkq3Yt8XItWq4asdeR4A&limit=1'
    request({url : url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to location services', undefined)
        }else if(body.features.length === 0){
            callback('Unable to find location.', undefined)
        }else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }

    })
}

module.exports = geocode