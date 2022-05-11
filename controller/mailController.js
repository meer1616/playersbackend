const nodemailer = require('nodemailer')
const express = require("express");
const router = express.Router();

const mail = async (req, res) => {
    // console.log(req.body);
    const { fullName, email, description } = req.body
    console.log("running");
    let transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "meer.spt@gmail.com",
            pass: "ddkamtsordnhmsnq",
        },
        tls: {
            rejectUnauthorized: false
        }
    })
    let mailOption = {
        from: "meer.spt@gmail.com",
        to: `${email}`,
        subject: "Thank you for reaching out!",
        text: `Dear ${fullName},

        Thank you for taking the time to introduce yourself.

        Let me know if you have any other ideas for how we can best collaborate. Perhaps we can set up a call in the coming weeks to discuss our next steps.Please send me any additional information you can offer about the position and feel free to ask any questions you might have for me or you can contact me on other social media platform as well.

        I look forward to hearing from you!

        Best,
        Meer Patel
        +91 9687466142
        `
    }

    await transport.sendMail(mailOption, function (err, success) {
        if (err) {
            console.log(err);
        } else {
            console.log("Email sent successfully");
        }
    })
    return res.send("ok")
}


module.exports = mail