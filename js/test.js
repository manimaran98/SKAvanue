const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
app.use(express.json());

app.post("/send-email", (req, res) => {
  const { name, email, message, terms } = req.body;
  let errorMSG = "";

  if (!name) {
    errorMSG += "Name is required ";
  }

  if (!email) {
    errorMSG += "Email is required ";
  }

  if (!message) {
    errorMSG += "Message is required ";
  }

  if (!terms) {
    errorMSG += "Terms is required ";
  }

  if (errorMSG) {
    return res.send(errorMSG);
  }

  const emailTo = "manimaranmahesan@gmail.com";
  const subject = "New Customer Enquiry";
  const emailBody = `Name: ${name}\nEmail: ${email}\nMessage: ${message}\nTerms: ${terms}\n`;

  // Configure nodemailer transport
  const transporter = nodemailer.createTransport({
    service: "gmail", // or another email service
    auth: {
      user: "your-email@gmail.com", // replace with your email
      pass: "your-password", // replace with your email password
    },
  });

  const mailOptions = {
    from: email,
    to: emailTo,
    subject: subject,
    text: emailBody,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send("Something went wrong :(");
    } else {
      console.log("Email sent: " + info.response);
      res.send("success");
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
