const shortid = require("shortid");
const URL = require("../models/url");

async function generateNewShortURL(req, res) {
    const body = req.body;
    if (!body) return res.status(400).json({msg: "URL required"});
    const shortID = shortid();
    await URL.create({
        shortId: shortID,
        redirectedURL: body.url,
        visitHistroy: [],
        createdBy: req.user._id,
    });
    res.render("home", {
       id: shortID, 
    });
}

async function getURL(req, res) {
    const shortId = req.params.shortId;
    console.log(shortId);
    const entry = await URL.findOneAndUpdate(
        {
            shortId,
        },
        {
            $push: {
                visitHistory : {
                    timestamp: Date.now(),
                }
            },
        }
    );
    res.redirect(entry.redirectedURL);
}

async function getAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});
    res.json({
        totalClicks: result.visitHistory.length,
        ip_address: req.ip,
        analytics: result.visitHistory,
    });
}


module.exports = {
    generateNewShortURL,
    getURL,
    getAnalytics,

}