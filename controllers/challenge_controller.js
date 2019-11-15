var express = require('express')
var router = express.Router();

const challengeService = require('../services/challenge_service');

router.route('/all')
    .get(challengeService.getAllChallenges);

router.get('/:id/percentage', function (request, response) {
    challengeService.getChallengePercentage(request.params.id)
        .then((data) => {
            response.status(200).json(data);
         }).catch((error) => {
            response.status(500).json({ 'error': error.message });
        });
});

router.get('/:id', function (request, response) {
    challengeService.getChallengeById(request.params.id)
        .then((challenge) => {
            response.status(200).json({ 'challenge': challenge });
         }).catch((error) => {
            response.status(500).json({ 'error': error.message });
        });
});

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