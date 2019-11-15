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
    .post(userService.addChallengeToUser);

// router.get('/:userId/challenge/:challengeId', function (request, response) {
//     let userId = request.params.userId
//         , challengeId = request.params.challengeId
//     ;
//     userService.hasUserChallenge(userId, challengeId)
//         .then((resp) => {
//             response.status(200).json(resp);
//         }).catch((error) => {
//             response.status(500).json(error);
//         });
// });

router.get('/:userId/challenges/all', function (request, response) {
    let userId = request.params.userId;
    userService.getAllChallengesWithStatus(userId)
        .then((challenges) => {
            response.status(200).json(challenges);
         }).catch((error) => {
            response.status(500).json(error);
        });
});

router.get('/:userId/challenges', function (request, response) {
    let userId = request.params.userId;
    userService.getUsersChallenges(userId)
        .then((challenges) => {
            response.status(200).json(challenges);
         }).catch((error) => {
            response.status(500).json(error);
        });
});

router.get('/:userId/challenges/count', function (request, response) {
    let userId = request.params.userId;
    userService.getUsersChallengeCounts(userId)
        .then((challenges) => {
            response.status(200).json(challenges);
         }).catch((error) => {
            response.status(500).json(error);
        });
});

router.get('/:userId/challenges/unassigned', function (request, response) {
    let userId = request.params.userId;
    userService.getUnassignedChallengesToUser(userId)
        .then((unassignedChallenges) => {
            response.status(200).json(unassignedChallenges);
         }).catch((error) => {
            response.status(500).json(error);
        });
});

router.delete('/:userId/challenge/:challengeId', function (request, response) {
    let userId = request.params.userId
        , challengeId = request.params.challengeId
    ;
    userService.removeUsersChallenge(userId, challengeId)
        .then((user) => {
            response.status(200).json(user);
         }).catch((error) => {
            response.status(500).json({ 'error': error });
        });
});

router.post('/:userId/challenge/:challengeId/complete', function (request, response) {
    let userId = request.params.userId
       , challengeId = request.params.challengeId
    ;
    userService.completeUsersChallenge(userId, challengeId)
        .then((resp) => {
            response.status(200).json(resp);
        }).catch((error) => {
            response.status(500).json(error);
        });
});

router.post('/:userId/challenge/:challengeId/reset', function (request, response) {
    let userId = request.params.userId
        , challengeId = request.params.challengeId
    ;
    userService.resetUsersChallenge(userId, challengeId)
        .then((user) => {
            response.status(200).json(user);
        }).catch((error) => {
            response.status(500).json({ 'error': error }); 
        });
});
 
module.exports = router;