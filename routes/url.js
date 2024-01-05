const express = require("express");

const router = express.Router();

const { generateNewShortURL, getURL, getAnalytics } = require("../controllers/url");

router
.route('/')
.post(generateNewShortURL);

router
.route('/:shortId')
.get(getURL);

router
.route('/analytics/:shortId')
.get(getAnalytics);

module.exports = router;