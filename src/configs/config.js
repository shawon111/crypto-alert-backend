const config = {
  threshold: 1, // % change alert
  coins: ["bitcoin", "ethereum", "solana"],

  cooldownMinutes: 30, // prevent spam alerts
  emailTo: "your@email.com",
};

module.exports = config