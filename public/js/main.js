const forecastForm = document.querySelector("form");
const searchInput = document.querySelector("input");
let message1 = document.querySelector("#message-1");
let message2 = document.querySelector("#message-2");

forecastForm.addEventListener("submit", e => {
  e.preventDefault();

  message1.textContent = "loading...";
  message2.textContent = "";

  fetch(`/weather?address=${searchInput.value}`)
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        message1.textContent = data.error;
      } else {
        message1.textContent = data.location;
        message2.textContent = data.forecastData;
      }
    });
});
