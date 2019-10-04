const request = require("request");

const key =
  "pk.eyJ1IjoiYXplZW16IiwiYSI6ImNrMTk1aDFtZzFxNDgzbG5pcmQxODhtdzcifQ.opM7h-vvX3302Ild5gUUvQ";
const baseUrl = "https://api.mapbox.com/geocoding/v5";

const geocode = (address, callback) => {
  const url = `${baseUrl}/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${key}&limit=1`;

  request({ url, json: true }, (error, response, { features } = {}) => {
    if (error) {
      callback("Unable to connect to location service!", undefined);
    } else if (response.statusCode === 404 || !features.length) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      const data = {
        lat: features[0].center[1],
        long: features[0].center[0],
        location: features[0].place_name
      };

      callback(undefined, data);
    }
  });
};

module.exports = geocode;
