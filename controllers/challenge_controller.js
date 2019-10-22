var express = require('express')
var router = express.Router();

const challengeService = require('../services/challenge_service');

router.get('/all', function (request, response) {
    challengeService.getAllChallenges()
        .then((challenges) => {
            console.log('Challenges :', challenges);
            response.status(200).json({ 'challenges': challenges });
         }).catch((error) => {
            response.status(500).json({ 'error': error.message });
        });
});

module.exports = router;