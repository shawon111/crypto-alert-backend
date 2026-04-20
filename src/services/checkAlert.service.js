const canSendAlert = require("../utils/alertState");
const { fetchCryptoData } = require("./crypto.service");
const sendEmail = require("./email.service");

const checkAlerts = async () => {
    const coins = await fetchCryptoData(config.coins);

    const cooldownMs = config.cooldownMinutes * 60 * 1000;

    for (const coin of coins) {
        const change = coin.change24h;

        if (Math.abs(change) >= config.threshold) {
            if (!canSendAlert(coin.symbol, cooldownMs)) continue;

            await sendEmail({
                subject: `🚨 ${coin.symbol} Alert`,
                text: `
Coin: ${coin.coinName}
Symbol: ${coin.symbol}
Price: $${coin.price}
24h Change: ${change.toFixed(2)}%
        `,
            });

            console.log(`Alert sent: ${coin.symbol}`);
        }
    }
}

module.exports = checkAlerts