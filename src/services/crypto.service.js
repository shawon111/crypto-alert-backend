// helper
function getDirection(change) {
  if (change > 0) return "up";
  if (change < 0) return "down";
  return "neutral";
}

// MAIN FUNCTION
async function fetchCryptoData(coinIds = []) {
  if (!coinIds.length) {
    throw new Error("coinIds required");
  }

  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinIds.join(",")}&sparkline=true`;

  const res = await fetch(url);
  const data = await res.json();
  console.log("COINGECKO RESPONSE:", data)
  if (!Array.isArray(data)) {
    throw new Error("CoinGecko returned non-array response");
  }
  return data.map((coin) => ({
    coinName: coin.name,
    symbol: coin.symbol.toUpperCase(),
    price: coin.current_price,
    marketCap: coin.market_cap,
    change24h: coin.price_change_percentage_24h,
    direction: getDirection(coin.price_change_percentage_24h),
    chart: coin.sparkline_in_7d?.price || [],
    image: coin.image
  }));
}

module.exports = {
  fetchCryptoData,
};