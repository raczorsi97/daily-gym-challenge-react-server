var winston = require('winston');

const parameters = {};
parameters.sslKeyPrivateFile = './configuration/keys/private.pem';
parameters.sslKeyPublicFile = './configuration/keys/public.pem';

const logger = winston.createLogger({
    transports: [
        new (winston.transports.Console)({}),
        /*new (winston.transports.File)({
            filename: `logs/results.log`,
        })*/
    ]
});

module.exports = parameters;