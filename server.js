const express = require("express");
const { Resend } = require("resend");
require("dotenv").config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const resend = new Resend(process.env.RESEND_API_KEY);

app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",   // temporary sender
      to: "saideepikasuresh2005@gmail.com",       // replace with your email
      subject: `New message from ${name}`,
      text: `From: ${email}\n\n${message}`
    });

    res.send("Message sent successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error sending message.");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});