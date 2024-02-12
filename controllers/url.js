const URL = require('../models/url');
const shortid = require('shortid');



async function handleGenerateNewShortUrl(req, res, next) {
    const body = req.body;
    if (!body) return res.status(400).json({ error: 'Invalid'});
    const shortId = shortid(8);
    await URL.create({
        shortId: shortId,
        redirectURL: body.url,
        visitHistory: [],
        createdBy: req.user._id,
    });

    return res.render('home', { 
        id:shortId
    });
}

async function handleGetAalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne(
        {
            shortId
        });
        res.json({
            totalClicks: result.visitHistory.length,
            analytics: result.visitHistory,
        })
}

async function handleRedirectURL (req,res){

    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
    {
        shortId
    },
    {
        $push: {
        visitHistory: {
            timestamp: Date.now()
        }
    }
});
    if (!entry) return res.status(404).json({error: 'URL not found'});
    res.redirect(entry.redirectURL);

}

module.exports = {
    handleGenerateNewShortUrl,
    handleGetAalytics,
    handleRedirectURL,
};