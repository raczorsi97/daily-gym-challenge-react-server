const fs = require('fs');
const jwt = require('jsonwebtoken');
const parameters = require('../configuration/db/parameters');
const lodash = require('lodash');

const cert = fs.readFileSync(parameters.sslKeyPrivateFile);
const pubCert = fs.readFileSync(parameters.sslKeyPublicFile);

function generateUserToken(user) {
    const userInformation = user.email;
    return jwt.sign({
            data: userInformation
        },
        cert,
        {
            algorithm: 'RS256',
            expiresIn: '1h'
        }
    );
}

function verifyToken(request, response, next) {
    var token = request.body.token || request.query.token || request.headers['x-access-token'];

    if (lodash.isUndefined(token)) {
        return response.status(403).json({message: "Authentication failed"});
    } else {
        jwt.verify(token, pubCert, {algorithm: 'RS256'}, function (error, decoded) {
            if (error) {
                return response.status(403).json({message: "Authentication failed"});
            } else {
                request.decoded = decoded;
                next();
            }
        });
    }
}

module.exports = {
    generateUserToken,
    verifyToken
}