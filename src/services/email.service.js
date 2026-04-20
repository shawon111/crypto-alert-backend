const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async({ subject, text }) =>{
  try {
    const result = await resend.emails.send({
      from: "Crypto Alert <onboarding@resend.dev>", 
      to: process.env.ALERT_EMAIL,
      subject,
      text,
    });

    console.log("Email sent:", result.id);
    return result;
  } catch (err) {
    console.error("Email error:", err);
    throw err;
  }
}

module.exports = sendEmail;