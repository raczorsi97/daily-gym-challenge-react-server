var express = require('express')
var router = express.Router();

const challengeService = require('../services/challenge_service');

router.route('/:id')
    .get(challengeService.getChallengeById);

router.route('/all')
    .get(challengeService.getAllChallenges);

router.route('/:id/percentage')
    .get(challengeService.getChallengePercentage);

router.route('/:id/rating')
    .get(challengeService.getChallengeRating);

router.route('/:id/rating/:rating')  
    .post(challengeService.rateChallenge);

module.exports = router;