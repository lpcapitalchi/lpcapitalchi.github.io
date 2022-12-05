// URL for the CoinDesk Bitcoin Price Index API
const API_URL = 'https://api.coindesk.com/v1/bpi/currentprice.json';

// Function to calculate the price of the user-entered amount of Bitcoin in US dollars
function calculatePrice() {
  // Get the user-entered amount of Bitcoin from the input field
  const btcAmount = document.getElementById('btc-amount').value;

  // Display the user-entered amount of Bitcoin on the page
  document.getElementById('btc-amount-display').innerText = btcAmount;

  // Fetch the current exchange rate from the API
  fetch(API_URL)
    .then(response => response.json())
    .then(data => {
      // Calculate the price of the user-entered amount of Bitcoin in US dollars
      const usdPrice = btcAmount * data.bpi.USD.rate_float;
      const satsPrice = 100000000 * btcAmount / data.bpi.USD.rate_float;

      // Display the calculated price on the page
      document.getElementById('usd-price-display').innerText = satsPrice.toLocaleString('en-US', {maximumFractionDigits:0});
    });
}
