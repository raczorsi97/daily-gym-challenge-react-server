const lodash = require('lodash')
    , jwtService = require('../services/jwt_service')
;

const UserModel = require('../schemas/userSchema')
    , ChallengeModel = require('../schemas/challengeSchema');

function isValidRegister(data) {
    return (
        isDataExists(data.username) && 
            isDataExists(data.password) &&
                isDataExists(data.name) &&
                    isDataExists(data.email)
    );
}

function isDataExists(field) {
    return (!lodash.isUndefined(field) && !lodash.isEmpty(field.trim()));
}

login = function(req, res) {
    let data = req.body;
    UserModel.findOne({ username: data.username } , function (err, user) {
        if (err) {
            return res.status(500).send(err.errmsg);
        }
        if (!user) {
            return res.status(500).send({ field: 'username', message: 'Invalid username' });
        }
        if (user.password != data.password) {
            return res.status(500).send({ field: 'password', message: 'Invalid passoword' });
        }
        let token = jwtService.generateUserToken(user);
        return res.json({ token, user });
    });
}

register = function(req, res) {
    let data = req.body;
    if (isValidRegister(data)) {
        UserModel.findOne({ username: data.username }, (err, user) => {
            if (err) {
                return res.status(500).send(err.errmsg);
            }
            if (user) {
                return res.status(500).send({ field: 'username', message: 'This username is already taken!'});
            }
            UserModel.findOne({ email: data.email }, (err, user) => {
                if (err) {
                    return res.status(500).send(err.errmsg);
                }
                if (user) {
                    return res.status(500).send({ field: 'email', message: 'This email is already taken!'});
                }
                UserModel.create(data, function (err, user) {
                    if (err) {
                        return res.status(500).send(err.errmsg);
                    }
                    let token = jwtService.generateUserToken(user);
                    return res.json({ token, user });
                });
            });
        });
    } else {
        return res.status(500).send({ error: 'missing fields' });
    }
}

getAllUsers = function(req, res) {
    UserModel.find({} , function (err, allusers) {
        if (err) {
           return res.status(500).send(err);
        }
        return res.json(allusers);
    });
}

getAllUsersModified = function(req, res) {
    UserModel.find({ _id: { $ne: req.params.userId } } , function (err, allusers) {
        if (err) {
           return res.status(500).send(err);
        }
        return res.json(allusers);
    });
}

getUser = function(req, res) { 
    UserModel.findOne({ _id: req.params.userId } , function (err, user) {
        if (err) {
            return res.status(500).send(err);
        }
        return res.json(user);
    });
}

getTopList = function(req, res) {
    let mappedUsers = []
        , sortedUsers = []
    ;
    UserModel.find({}, function(err, users) {
        if (err) {
            return res.status(500).send(err);
        }
        mappedUsers = users.map( u => { 
            return { user: u, count: u.completed_challenges.length };
        });
        sortedUsers = mappedUsers.sort((a, b) => {
            return b.count - a.count;
        });
        res.json(sortedUsers);
    });
}

updateUser = function(req, res) {
    let userId = req.params.userId
        , data = req.body.data
    ;
    UserModel.updateOne({ _id: userId}, { $set: data }, function(err, user) {
        if (err) {
            return res.status(500).send(err);
        }
        UserModel.findOne({ _id: userId}, function(err, user) {
            if (err) {
                return res.status(500).send(err);
            }
            return res.json(user);
        });
    });
}

addChallengeToUser = function(req, res) {
    let userId = req.params.userId
        , challengeId = req.params.challengeId
    ;
    UserModel.findOneAndUpdate({ _id: userId}, { $push: { challenges: challengeId }}, function(err, resp) {
        if (err) {
            return res.status(500).send(err);
        }

        ChallengeModel.findOneAndUpdate({ _id: challengeId}, { $push: { in_progress: userId }}, function(err, resp) {
            if (err) {
                return res.status(500).send(err);
            }
            UserModel.findOne({ _id: userId }, function(err, user) {
                if (err) {
                    return res.status(500).send(err);
                }
                return res.json(user);
            });
        });
    });
}

removeUsersChallenge = function(req, res) {
    let userId = req.params.userId
        , challengeId = req.params.challengeId
    ;
    UserModel.findOneAndUpdate({ _id: userId }, { $push: { abandoned_challenges: challengeId }}, function(err, user) {
        if (err) {
            return res.status(500).send(err.errmsg);
        }

        ChallengeModel.findOneAndUpdate(
            { _id: challengeId }, {$push: { abandoned: userId }, $pull: { in_progress: userId }}, function(err, challenge) {
                if (err) {
                    return res.status(500).send(err.errmsg);
                }
                UserModel.findOne({ _id: userId}, function(err, user) {
                    if (err) {
                        return res.status(500).send(err.errmsg);
                    }
                    res.json(user);
                });
        });
    });
}

completeUsersChallenge = function(req, res) {
    let userId = req.params.userId
        , challengeId = req.params.challengeId
    ;
    UserModel.findOneAndUpdate({ _id: userId }, { $push: { completed_challenges: challengeId }}, function(err, user) {
        if (err) {
            return res.status(500).send(err.errmsg);
        }

        ChallengeModel.findOneAndUpdate(
            { _id: challengeId }, {$push: { completed: userId }, $pull: { in_progress: userId }}, function(err, challenge) {
                if (err) {
                    return res.status(500).send(err.errmsg);
                }
                UserModel.findOne({ _id: userId}, function(err, user) {
                    if (err) {
                        return res.status(500).send(err.errmsg);
                    }
                    res.json(user);
                });
        });
    });
}

resetUsersChallenge = function(req, res) {
    let userId = req.params.userId
        , challengeId = req.params.challengeId
    ;
    UserModel.findOneAndUpdate(
        { _id: userId }, { $pull: { challenges: challengeId, abandoned_challenges: challengeId }}, function(err, user) {
            if (err) {
                return res.status(500).send(err.errmsg);
            }
            ChallengeModel.findOneAndUpdate({ _id: challengeId }, {$pull: { abandoned: userId }}, function(err, challenge) {
                    if (err) {
                        return res.status(500).send(err.errmsg);
                    }

                    UserModel.findOne({ _id: userId}, function(err, user) {
                        if (err) {
                            return res.status(500).send(err.errmsg);
                        }
                        res.json(user);
                    });
            });
    });
}

getUsersChallenges = function(req, res) {
    let userId = req.params.userId
        , allChallenges = []
        , completedChallenges = []
        , abandonedChallenges = []
        , inProgressChallenges = []
    ;
    ChallengeModel.find({}, function(err, challenges) {
        if (err) {
            return res.status(500).send(err.errmsg)
        }

        UserModel.findOne({ _id: userId}, function(err, user) {
            if (err) {
                return res.status(500).send(err.errmsg)
            }

            challenges.forEach( ch => {
                user.completed_challenges.forEach( uCh => {
                    if (ch._id == uCh) {
                        ch.status = 'completed';
                        completedChallenges.push(ch);
                    }
                });
            });
            challenges.forEach( ch => {
                user.abandoned_challenges.forEach( uCh => {
                    if (ch._id == uCh) {
                        ch.status = 'abandoned';
                        abandonedChallenges.push(ch);
                    }
                });
            });
            challenges.forEach( ch => {
                user.challenges.forEach( uCh => {
                    if (ch._id == uCh) {
                        if (!ch.status || ch.status == 'in_progress') {
                            ch.status = 'in_progress';
                            inProgressChallenges.push(ch);
                        }
                        allChallenges.push(ch);
                    }
                });
            });
            return res.json({
                challenges: allChallenges
                , completedChallenges: completedChallenges
                , abandonedChallenges: abandonedChallenges
                , inProgressChallenges: inProgressChallenges
            } );
        });
    });
}

getUnassignedChallengesToUser = function(req, res) {
    let userId = req.params.userId;
    ChallengeModel.find({}, function(err, challenges) {
        if (err) {
            return res.status(500).send(err.errmsg);
        }

        UserModel.findOne({ _id: userId }, function(err, user) {
            if (err) {
                return res.status(500).send(err.errmsg);
            }
            let unassignedChallenges = challenges.filter((challenge) => {
                let index = user.challenges.findIndex( uCh => uCh == challenge._id);
                return (index < 0);
            });
            return res.json(unassignedChallenges);
        });
    });
}

hasUserChallenge = function(req, res) {
    let userId = req.params.userId
        , challengeId = req.params.challengeId
    ;
    UserModel.findOne({ _id: userId }, function(err, user) {
        if (err) {
            return res.status(500).send(err);
        }
        if (!user) {
            return res.json(false);
        } else {
            if ( user.challenges.includes(challengeId) ) {
                ChallengeModel.findOne({ _id: challengeId }, function(err, challenge) {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    challenge.status = 'in_progress';
                    if ( user.completed_challenges.includes(challengeId)) {
                        challenge.status = 'completed';
                    }

                    if ( user.abandoned_challenges.includes(challengeId)) {
                        challenge.status = 'abandoned';
                    }

                    return res.json(challenge);
                });
            } else {
                return res.json(false);
            }
        }
    });
}

getAllChallengesWithStatus = (req, res) => {
    let userId = req.params.userId
        , allChallenges = []
    ;
    ChallengeModel.find({}, (err, challenges) => {
        if (err) {
            return res.status(500).send(err);
        }
        challenges.forEach( challenge => {
            let index = challenge.completed.findIndex(uId => uId == userId);
            if ( index > -1 ) {
                allChallenges.push({ name: challenge.title, status: 'completed' });
            } else {
                index = challenge.abandoned.findIndex(uId => uId == userId);
                if ( index > -1 ) {
                    allChallenges.push({ name: challenge.title, status: 'abandoned' });
                } else {
                    index = challenge.in_progress.findIndex( uId => uId == userId);
                    if ( index > -1 ) {
                        allChallenges.push({ name: challenge.title, status: 'in_progress' });
                    } else {
                        allChallenges.push({ name: challenge.title, status: 'ready_to_start' });
                    }
                }
            }
        });
        return res.json(allChallenges);
    });
}

getUsersChallengeCounts = function(req, res) {
    let userId = req.params.userId
        , allChallenges = []
        , completedChallenges = []
        , abandonedChallenges = []
        , inProgressChallenges = []
    ;
    ChallengeModel.find({}, function(err, challenges) {
        if (err) {
            return res.status(500).send(err.errmsg)
        }

        UserModel.findOne({ _id: userId}, function(err, user) {
            if (err) {
                return res.status(500).send(err.errmsg)
            }
            challenges.forEach( ch => {
                user.completed_challenges.forEach( uCh => {
                    (ch._id == uCh) && completedChallenges.push(ch);
                });
            });
            challenges.forEach( ch => {
                user.abandoned_challenges.forEach( uCh => {
                    (ch._id == uCh) && abandonedChallenges.push(ch);
                });
            });
            challenges.forEach( ch => {
                user.challenges.forEach( uCh => {
                    (ch._id == uCh) && inProgressChallenges.push(ch);
                    allChallenges.push(ch);
                });
            });
            return res.json({
                completed: completedChallenges.length
                , abandoned: abandonedChallenges.length
                , inProgress: inProgressChallenges.length
            } );
        });
    });
}

module.exports = {
    login
    , register
    , getUser
    , updateUser
    , isValidRegister
    , getAllUsers
    , addChallengeToUser
    , getUsersChallenges
    , hasUserChallenge
    , removeUsersChallenge
    , completeUsersChallenge
    , resetUsersChallenge
    , getUnassignedChallengesToUser
    , getAllChallengesWithStatus
    , getAllUsersModified
    , getUsersChallengeCounts
    , getTopList
}