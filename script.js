// URL for the CoinDesk Bitcoin Price Index API
const API_URL = 'https://api.coindesk.com/v1/bpi/currentprice.json';

// Function to calculate the price of the user-entered amount of Bitcoin in US dollars
function calculatePrice() {
  // Get the user-entered amount of Bitcoin from the input field
  const btcAmount = Number(document.getElementById('btc-amount').value);

  // Display the user-entered amount of Bitcoin on the page
  document.getElementById('btc-amount-display').innerText = btcAmount.toLocaleString('en-US');

  // Fetch the current exchange rate from the API
  fetch(API_URL)
    .then(response => response.json())
    .then(data => {
      // Calculate the price of the user-entered amount of Bitcoin in US dollars
      const usdPrice = btcAmount * data.bpi.USD.rate_float;
      const satsPrice = 100000000 * btcAmount / data.bpi.USD.rate_float;
      const btcPrice = data.bpi.USD.rate_float;

      // Display the calculated price on the page
      document.getElementById('usd-price-display').innerText = satsPrice.toLocaleString('en-US', {maximumFractionDigits:0});
      document.getElementById('fullcoin-price-display').innerText = btcPrice.toLocaleString('en-US', {maximumFractionDigits:0});
    });
}

// Get the input field
var input = document.getElementById("btc-amount");

// Execute a function when the user presses a key on the keyboard
input.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("calculate-button").click();
  }
});

function displayPrice() {

  // Fetch the current exchange rate from the API
  fetch(API_URL)
    .then(response => response.json())
    .then(data => {
      // Calculate the price of the user-entered amount of Bitcoin in US dollars
      const btcPrice = data.bpi.USD.rate_float;

      // Display the calculated price on the page
      document.getElementById('fullcoin-price-display').innerText = btcPrice.toLocaleString('en-US', {maximumFractionDigits:0});
    });
}

var result = displayPrice();
window.onload = result;
