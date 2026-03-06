// Reliable BTC-USD spot rate from Coinbase.
const API_URL = 'https://api.coinbase.com/v2/prices/BTC-USD/spot';
const SATOSHIS_PER_BTC = 100000000;

async function getBtcUsdRate() {
  const response = await fetch(API_URL, { cache: 'no-store' });

  if (!response.ok) {
    throw new Error(`Failed to fetch BTC price (${response.status})`);
  }

  const data = await response.json();
  const rate = Number.parseFloat(data?.data?.amount);

  if (!Number.isFinite(rate) || rate <= 0) {
    throw new Error('Invalid BTCUSD rate returned by API');
  }

  return rate;
}

// Convert user-entered USD amount to sats.
async function calculatePrice() {
  const usdAmount = Number(document.getElementById('btc-amount').value);
  const safeUsdAmount = Number.isFinite(usdAmount) && usdAmount > 0 ? usdAmount : 0;

  document.getElementById('btc-amount-display').innerText = safeUsdAmount.toLocaleString('en-US');

  try {
    const btcUsdRate = await getBtcUsdRate();
    const satsPrice = (safeUsdAmount / btcUsdRate) * SATOSHIS_PER_BTC;

    document.getElementById('usd-price-display').innerText = satsPrice.toLocaleString('en-US', { maximumFractionDigits: 0 });
    document.getElementById('fullcoin-price-display').innerText = btcUsdRate.toLocaleString('en-US', { maximumFractionDigits: 0 });
  } catch (error) {
    document.getElementById('usd-price-display').innerText = 'Unavailable';
    document.getElementById('fullcoin-price-display').innerText = 'Unavailable';
    console.error(error);
  }
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
  getBtcUsdRate()
    .then((btcPrice) => {
      document.getElementById('fullcoin-price-display').innerText = btcPrice.toLocaleString('en-US', { maximumFractionDigits: 0 });
    })
    .catch((error) => {
      document.getElementById('fullcoin-price-display').innerText = 'Unavailable';
      console.error(error);
    });
}

window.onload = displayPrice;
