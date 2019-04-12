const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000

// Define path for express config
const publicDir = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static dir to serve
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        author: 'Luz Diaz'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        author: 'Luz Diaz'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'We have to provide some help for you.',
        author: 'Luz Diaz'
    })
})

app.get('/weather',(req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }

    geocode(req.query.address, (error, { longitude, latitude, location } = {}) => {
        if ( error ) {
            return res.send({error})            
        }
        
        forecast(longitude, latitude, (error, forecast) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                location,
                forecast
            })
        })        
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Help',
        message: 'Help article not found.',
        author: 'Luz Diaz'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Page not found.',
        author: 'Luz Diaz'
    })
})

app.listen(port, () => {
    console.log('on port ' + port)
})