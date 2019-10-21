const app = require('express')();
const http = require('http').Server(app).listen(3001);
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const userController = require('./controllers/user_controller')
    , postController = require('./controllers/post_controller')
    , challengeController = require('./controllers/challenge_controller')
;

app.use('/user', userController);
app.use('/post', postController);
app.use('/challenge', challengeController);