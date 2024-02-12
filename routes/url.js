const express = require('express');
const { handleGenerateNewShortUrl, handleGetAalytics, handleRedirectURL } = require('../controllers/url');

const router = express.Router();

router.post('/', handleGenerateNewShortUrl);
router.get('/analytics/:shortId', handleGetAalytics);
router.get('/:shortId', handleRedirectURL);

module.exports = router;