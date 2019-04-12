const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = `https://api.darksky.net/forecast/81a7573b305f6863f940cf4fda82a31b/${latitude},${longitude}`
    request( { url, json: true }, (error, { body }) => {
        if (error) {
            callback( `Unable to connect to weather service: ${error.Error}`, undefined )
        } else if ( body.error ) {
            callback( `Unable to find location: ${response.body.error}`, undefined )
        } else {
            const current = body.currently
            const today = body.daily.data[0]
            callback( undefined, `${today.summary} It is currently ${current.temperature} degress out. There is a ${current.precipProbability}% chance of rain. 
            The low today is ${today.temperatureMin} degress with a high of ${today.temperatureMax}.`)
        }
    })
}

module.exports = forecast