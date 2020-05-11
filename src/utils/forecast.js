const request= require('request')
const forecast =(latitude,longitude,callback)=> {
    const url='http://api.weatherstack.com/current?access_key=86db919d3a61ac3b5fadaa1101f1a50e&query='+latitude+','+longitude+'&units=f'
    request({url,json: true}, (error, {body})=> {
        if(error){
            console.log('Unable to connect to weather service!',undefined)
        }else if(body.error) {
            callback('Unable to find location',undefined)
        } else {
            callback(undefined,body.current.weather_descriptions[0]+" It is currently "+ body.current.temperature +" degress out. It feels like "+ body.current.feelslike+ " degress out. The humidity is "+ body.current.humidity+ "%.")
        }
    })
}
module.exports = forecast