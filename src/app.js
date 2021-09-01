const path = require('path');
const express = require('express');

const geoLocation = require('../utils/geoLocation');
const foreCast = require('../utils/foreCast');

const port = process.env.PORT || 3001;

// To be able to use PERTIALS we instanciate HBS-HandleBars
const hbs = require('hbs');

const app = express();
// Get the relative RELATIVE PATH for the static files. 
const staticFiles = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Add the RELATIVE PATH Middleware using express.static().
// with this, express will look at the public folder and find the HTML 
// approprieted to the url you a sending and render it.
app.use(express.static(staticFiles));

//Tell express that we are using a template engeni 
// you case HBS that use HandleBars.
app.set("view engine", "hbs");
// Tells express that we are using a diferente file to handle 
// ours views
app.set("views", viewsPath);
// Show HBS where is the PARTIALS
hbs.registerPartials(partialsPath);


app.get('', (req, res) => {
    res.render('index', {
        title: "Weather"
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About"
    });
})  

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help"
    });
})

app.get('/weather', (req, res) => {
    const queryCity = req.query.city;
    if(!queryCity){
        return res.send({
            error: "Please enter a City Name on the Search Box."
        });
    }
    geoLocation( queryCity, 1, (error, response) => {
        if(error){
            return res.send({error: error });
        }
        let {latitude, longitude } = response;
        foreCast(`${latitude},${longitude}`, (error, data) => {
            if(error){
                return res.send({error: error });
            }
            res.send({
                temperature: data.current.temperature,
                icons: data.current.weather_icons,
                weather_description: data.current.weather_description,
                name: data.location.name,
                country: data.location.country,
                region: data.location.region,
                localTime: data.location.localtime
            });
        });
    });
    
})

app.get("/products", (req, res) => {
    const param = req.query.search;
    res.send({
        products: [],
        param: param
    });
})

app.get("/*", (req, res) => {
    res.render("notFound", {
        title: "Not Found"
    });
})


app.listen(port, () => {
    console.log(`Server rinning on port : ${port}`);
})