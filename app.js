const express = require("express");
const app = express();
const https = require("https");
const port = 3000;
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  const query = req.body.cityName;
  const apiKey = "1953ec364938a7b49fe3a2ed27a52a28";
  const unit = "metric";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=${unit}&appid=${apiKey}`;
  https.get(url, (response) => {
    console.log(response.statusCode);

    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDesc = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      console.log(icon);
      const imgURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;

      res.write(`<p>The weather is currently ${weatherDesc}</p>`);
      res.write(
        `<h1>The temperature in ${query} is ${temp} degree celcius</h1>`
      );
      res.write(`<img src="${imgURL}"/>`);
      res.send();
    });
  });
});

app.listen(port, () => {
  console.log("Server is listening on port: " + port);
});
