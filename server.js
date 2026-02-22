const express = require("express");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); // put index.html inside public folder

app.post("/contact", async (req, res) => {
    const { name, email, message } = req.body;

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        await transporter.sendMail({
            from: email,
            to: process.env.EMAIL_USER,
            subject: `New message from ${name}`,
            text: message
        });

        res.send("Message sent successfully!");
    } catch (error) {
        console.error(error);
        res.send("Error sending message.");
    }
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});