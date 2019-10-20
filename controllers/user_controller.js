const userService = require('../services/user_service');
const jwtService = require('../services/jwt_service');

var express = require('express');
var router = express.Router();

router.post('/login', function (request, response) {
    const data = request.body;

    if (userService.isValidLogin(data)) {
        userService.login(data).then((result) => {
            response.status(200).json({token: result});
        }, error => {
            response.status(403).json({"error": error.message});
        }).catch((error) => {
            response.status(500).json({"error": error.message});
        });
    } else {
        response.status(500).json({"error": "missing fields"});
    }
});

router.post('/register', function (request, response) {
    const data = request.body;

    if (userService.isValidRegister(data)) {
        userService.register(data).then((result) => {
            response.status(200).json({token: result});
        }, error => {
            console.log('Error :', error.message);
            response.status(403).json({"error": error.message});
        }).catch((error) => {
            response.status(500).json({"error": error.message});
        });
    } else {
        response.status(500).json({"error": "missing fields"});
    }
});

router.get('/all', /*jwtService.verifyToken, */ function (request, response) {
    console.log(request.decoded);

    userService.getAllUsers().then((users) => {
        response.status(200).json({ "users": users});
    }).catch((error) => {
        response.status(500).json({"error": error.message});
    });
});

router.get('/all/posts', jwtService.verifyToken, function (request, response) {
    console.log(request.decoded);

    userService.getAllUsersWithAllPosts().then((users) => {
        response.status(200).json({ "users": users});
    }).catch((error) => {
        response.status(500).json({"error": error.message});
    });
});

module.exports = router;