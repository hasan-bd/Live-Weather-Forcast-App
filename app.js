const express = require('express')
const bodyParser = require('body-parser')
const https = require('https')
const app = express()
const port = 3000


app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
res.sendFile(__dirname + "/index.html")
})

app.post('/',function(req, res){

  const query =req.body.CityName
  const apiKey = 'e8b409620fdcb6eb53236fde51df9ddc'
  const unit = 'metric'
  const url = 'https://api.openweathermap.org/data/2.5/weather?appid='+ apiKey +'&q='+ query +'&units='+unit

  https.get(url, function(response) {
    console.log(response.statusCode)
    response.on('data', function(data) {
      const weatherdata = JSON.parse(data)
      const tempa = weatherdata.main.temp
      const description = weatherdata.weather[0].description
      const icon = weatherdata.weather[0].icon
      const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png"

      res.write("<p>The currently weather forcast in "+ query + " " + description + " .</p>" )
      res.write("<h1>The Tempareur in "+ query+" " + tempa + " Degree Celcius. </h1>")
      res.write("<img src = " + imageURL + ">")

      res.send()
    })
  })


})






app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
