const mongooseUri = "mongodb+srv://test:test@dailygymchallenge-dmpss.mongodb.net/DailyGymChallenge?retryWrites=true&w=majority"
    , port = 3001
; 
const app = require('express')()
    , http = require('http').Server(app).listen(port)
    , bodyParser = require('body-parser')
    , mongoose = require('mongoose')
;

const userController = require('./controllers/user_controller')
    , postController = require('./controllers/post_controller')
    , challengeController = require('./controllers/challenge_controller')
;

mongoose.connect(mongooseUri, { useNewUrlParser: true })
    .then(() => {
        console.log('Connected...');
    })
    .catch( error => {
        console.log('Something went wrong...');
    });


app.use(bodyParser.json({limit: '250mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '250mb', extended: true}));

app.use('/user', userController);
app.use('/post', postController);
app.use('/challenge', challengeController);