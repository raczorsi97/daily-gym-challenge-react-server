var express = require('express');
var router = express.Router();

const postService = require('../services/post_service');
const jwtService = require('../services/jwt_service');

router.get('/all', jwtService.verifyToken, function (request, response) {
    postService.getAllPosts().then((posts) => {
        response.status(200).json({ "posts": posts});
    }).catch((error) => {
        response.status(500).json({"error": error.message});
    });
});

router.post('/new', jwtService.verifyToken, function (request, response) {
    const data = request.body;

    if (postService.isValid(data)) {
        postService.create(data).then((post) => {
            response.status(200).json({post: post.get()});
        }, error => {
            response.status(403).json({"error": error.message});
        }).catch((error) => {
            response.status(500).json({"error": error.message});
        });
    }
});

router.put('/edit', jwtService.verifyToken, function (request, response) {
    const data = request.body;

    postService.edit(data).then((post) => {
        response.status(200).json({post: post.get()});
    }, error => {
        response.status(403).json({"error": error.message});
    }).catch((error) => {
        response.status(500).json({"error": error.message});
    });
});

router.delete('/delete', jwtService.verifyToken, function (request, response) {
    const data = request.body;

    postService.deletePost(data).then((numberOfDeletedPosts) => {
        response.status(200).json({numberOfDeletedPosts});
    }, error => {
        response.status(403).json({"error": error.message});
    }).catch((error) => {
        response.status(500).json({"error": error.message});
    });
});

module.exports = router;