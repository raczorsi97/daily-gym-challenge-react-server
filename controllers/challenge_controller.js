var express = require('express')
var router = express.Router();

const challengeService = require('../services/challenge_service');

router.route('/all')
    .get(challengeService.getAllChallenges);

router.route('/:id/percentage')
    .get(challengeService.getChallengePercentage);

router.route('/:id')
    .get(challengeService.getChallengeById);

router.get('/:id/rating', function (request, response) {
    let challengeId = request.params.id;
    challengeService.getChallengeRating(challengeId)
        .then((rating) => {
            response.status(200).json(rating);
         }).catch((error) => {
            response.status(500).json({ 'error': error.message });
        });
});

router.post('/:id/rating/:value', function (request, response) {
    let challengeId = request.params.id
        , rating = request.params.value
    ;
    challengeService.rateChallenge(challengeId, rating)
        .then((challenge) => {
            response.status(200).json(challenge);
         }).catch((error) => {
            response.status(500).json({ 'error': error.message });
        });
});

module.exports = router;