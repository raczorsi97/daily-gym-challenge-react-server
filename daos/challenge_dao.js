const challenges = require('../mocks/challenges')
    , users = require('../mocks/users')
;

async function getAllChallenges() {
    return challenges;
}

async function getChallengeById(challengeId) {
    return challenges.find((challenge) => {
        return challenge.id == challengeId;
    });
}

async function getChallengePercentage(challengeId) {
    let challenge = challenges.find( ch => ch.id == challengeId)
        , allUsers = users.length
        , inProgressCount = challenge.in_progress.length
        , completedCount = challenge.completed.length
        , abandonedCount = challenge.abandoned.length
    ;

    let inProgressPercentage = (inProgressCount * 100) / allUsers
        , completedPercentage = (completedCount * 100) / allUsers
        , abandonedPercentage = (abandonedCount * 100) / allUsers
        , notAssignedPercentage = 100 - (inProgressPercentage + completedPercentage + abandonedPercentage)
    ;

    return { inProgressPercentage, completedPercentage, abandonedPercentage, notAssignedPercentage };
}

async function getChallengeRating(challengeId) {
    return challenges.find( ch => ch.id == challengeId).rating;
}

async function rateChallenge(challengeId, rating) {
    let challenge = challenges.find( ch => ch.id == challengeId);
    challenge.ratings.push(parseInt(rating));

    let sum  = challenge.ratings.reduce((a, b) => a + b, 0)
    challenge.rating = sum/challenge.ratings.length;
    return challenge;
}

module.exports = {
    getAllChallenges
    , getChallengeById
    , getChallengePercentage
    , getChallengeRating
    , rateChallenge
}