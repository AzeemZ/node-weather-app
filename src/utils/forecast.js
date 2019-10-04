const request = require("request");

const key = "7bdaf9df95a9758b5ebbabd7c83ab54b";

const forecast = (lat, long, callback) => {
  const url = `https://api.darksky.net/forecast/${key}/${lat},${long}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to find weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      const temperature = body.currently.temperature;
      const precipProbability = body.currently.precipProbability;
      const summary = body.daily.summary;

      const temperatureMsg = ` It is currently ${temperature} degrees out. `;
      const chanceOfRainMsg = `There is a ${precipProbability}% chance of rain.`;
      const mainMsg = summary + temperatureMsg + chanceOfRainMsg;

      callback(undefined, mainMsg);
    }
  });
};

module.exports = forecast;
