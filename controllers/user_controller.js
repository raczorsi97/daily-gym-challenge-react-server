const userService = require('../services/user_service');
const jwtService = require('../services/jwt_service');

var express = require('express');
var router = express.Router();

router.post('/login', function (request, response) {
    const data = request.body;

    if (userService.isValidLogin(data)) {
        userService.login(data).then(
            result => {
                response.status(200).json(result);
            }, 
            error => {
                response.status(403).json({ message: error.message, field: error.field });
        }).catch((error) => {
            response.status(500).json({ message: error.message });
        });
    } else {
        response.status(500).json({ 'error': 'missing fields' });
    }
});

router.post('/register', function (request, response) {
    const data = request.body;

    if (userService.isValidRegister(data)) {
        userService.register(data).then((result) => {
            response.status(200).json(result);
        }, error => {
            response .status(422).json({ field : error.field, message: error.message });
        }).catch((error) => {
            response.status(500).json({ field : error.field, message: error.message });
        });
    } else {
        response.status(500).json({ 'error': 'missing fields' });
    }
});

router.get('/all', function (request, response) {
    userService.getAllUsers().then((users) => {
        response.status(200).json({ 'users': users });
    }).catch((error) => {
        response.status(500).json({ 'error': error.message });
    });
});

router.get('/all/posts', function (request, response) {
    userService.getAllUsersWithAllPosts().then((users) => {
        response.status(200).json({ 'users': users });
    }).catch((error) => {
        response.status(500).json({ 'error': error.message });
    });
});

module.exports = router;