const express = require('express');
const router = express.Router();
const mailController = require('../controller/mailController')
const MailData = require('../model/dbmail')

const getallmailsData = async (req, res) => {
    try {
        const mailData = await MailData.find({});
        res
            .status(200)
            .json({ mailData, success: true, msg: "get all mail data successful" });
    } catch (error) {
        res.status(500).json({ msg: error });
    }

    // res.status(200).json({
    //   name: "Meer",
    //   age: "21",
    //   totalMedals: "50",
    //   designation: "International Champion",
    //   rating: "4",
    // });
};


router.post('/', mailController);

router.get('/', getallmailsData);

module.exports = router;