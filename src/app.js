const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname,'../templates/views'))
hbs.registerPartials(path.join(__dirname,'../templates/partials'))

app.use(express.static(path.join(__dirname,'../public')))

app.get('', (req,res) =>{
    res.render('index',{
        title: 'Weather app',
        name: 'Akash'
    })
})

app.get('/about', (req,res) =>{
    res.render('about',{
        title: 'About me',
        name: 'Akash'
    })
})

app.get('/help', (req,res) =>{
    res.render('help',{
        title: 'Help page',
        name: 'Akash',
        message: 'Poi saavu da',
    })
})


app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location}={}) => {
        if(error){
            return res.send({
                error
            })
        } 
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error
                })
            }
            
            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            })
    
          })
    
    })

})

app.get('/help/*', (req, res) => {
    res.render('error', {
        errorMessage: 'Help article not found',
        name:'Akash',
        title: 'Help 404'
    })
})

app.get('*', (req, res) => {

    res.render('error', {
        errorMessage: 'Page not found!',
        name: 'Akash',
        title:'404'
    })
})

app.listen(3000, () =>{
    console.log('Server is running!')
})