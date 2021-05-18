const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const fetch = require('node-fetch');

require('dotenv/config');
const port = 5000;
const app = express();
app.use(cors());

app.get('/', (req, res) => res.send('Hola mundo'));

app.get('/cities', (req, res) => {
  fs.readFile(path.join(__dirname, 'cities.co.json'), 'utf8', (err, data) => {
    if (err) throw err;
    const cities = JSON.parse(data);
    cities.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
    res.send(cities);
  });
});

/** 
  Se realiza el llamado desde el backend debido a que el API
  tiene restricción de CORS
*/
app.get('/weather/:cityID', (req, res) => {
  const cityID = req.params.cityID;
  const apiKey = process.env.API_KEY;
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?id=${cityID}&appid=${apiKey}`
  )
    .then((res) => res.json())
    .then((data) => res.send(data.weather[0]));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
