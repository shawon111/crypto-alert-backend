const cron = require("node-cron");
const checkAlerts = require("../services/checkAlert.service");

function startCron() {
  cron.schedule("* * * * *", async () => {
    try {
      console.log("🔄 Running cron job...");
      await checkAlerts();
    } catch (err) {
      console.error("Cron error:", err.message);
    }
  });
}

module.exports = startCron;