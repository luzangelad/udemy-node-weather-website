const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibHVkaWF6IiwiYSI6ImNqdWN1dmtkaTBzYjg0M21obnVscjg5MmUifQ.vOWMJGRs00yhyafQdcI1iA&limit=1`

    request( { url, json: true }, (error, { body }) => {
        if (error) {
            callback(`Unable to connect to location service: ${error.Error}`, undefined)
        } else if ( body.features.length === 0 ) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            const data = body.features[0]
            callback(undefined, { 
                location: data.place_name, 
                longitude: data.center[0], 
                latitude: data.center[1] 
            })
        }
    })
    
}

module.exports = geocode