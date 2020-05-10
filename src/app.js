const path= require('path')
const express = require('express')
const hbs= require('hbs')
const forecast=require('./utils/forecast')
const geocode= require('./utils/geocode')
console.log(__dirname)
console.log(path.join(__dirname, '../public'))
const app= express()
//Define paths for express config
const pubilcDirectoryPath= path.join(__dirname, '../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath= path.join(__dirname,"../templates/partials")
//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
//Setup static directory to serve
app.use(express.static(pubilcDirectoryPath))
app.get('',(req,res)=> {
    res.render('index', {
        title: 'Weather App',
        name: 'Geetanshu Chhabra'
    })
})
app.get('/about',(req,res)=> {
    res.render('about',{
        title: 'About Me',
        name: 'Geetanshu chhabra'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        helpText: 'This is some helpful text',
        title: 'Help',
        name: 'Geetanshu chhabra'
    })
})




app.get('/weather',(req,res)=>{
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location}={})=>{
        if(error){
            return res.send({error})
        } 
        forecast(latitude,longitude, (err,forecastData)=> {
            if(error)
            {
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })

    })
    // res.send([{
    //     forecast: 'It is snowing',
    //     location: 'Phildalphia',
    //     address: req.query.address
    // }

})
app.get('/products',(req,res)=> {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search terms'
        })
    } 
    console.log(req.query)
    res.send({
        products: []
    })
})
app.get('/help/*',(req,res)=> {
    res.render('404', {
        title: '404 help',
        name: 'Geetanshu chhabra',
        errorMessage: 'Help article not found.'

    })

})
app.get('*',(req,res)=> {
    res.render('404', {
        title: '404',
        name: 'Geetanshu chhabra',
        errorMessage: 'Page not found.'
    })
})
app.listen(3000, ()=>{
    console.log('Server is up on port 3000.')
})