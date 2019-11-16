const userService = require('../services/user_service');
const jwtService = require('../services/jwt_service');

var express = require('express');
var router = express.Router();

router.route('/login')
    .post(userService.login);

router.route('/register')
    .post(userService.register);

router.route('/all')
    .get(userService.getAllUsers);

router.route('/top')
    .get(userService.getTopList);

router.route('/:userId')
    .get(userService.getUser)
    .put(userService.updateUser);

router.route('/:userId/all')
    .get(userService.getAllUsersModified);

router.route('/:userId/challenge/:challengeId')
    .get(userService.hasUserChallenge)
    .post(userService.addChallengeToUser)
    .delete(userService.removeUsersChallenge);

router.route('/:userId/challenge/:challengeId/complete')
    .post(userService.completeUsersChallenge);

router.route('/:userId/challenge/:challengeId/reset')
    .post(userService.resetUsersChallenge);

router.route('/:userId/challenges')
    .get(userService.getUsersChallenges);

router.route('/:userId/challenges/unassigned')
    .get(userService.getUnassignedChallengesToUser);

router.route('/:userId/challenges/count')
    .get(userService.getUsersChallengeCounts);

router.route('/:userId/challenges/all')
    .get(userService.getAllChallengesWithStatus);

module.exports = router;