const mongooseUri = "mongodb+srv://test:test@dailygymchallenge-dmpss.mongodb.net/DailyGymChallenge?retryWrites=true&w=majority"
    , port = 3001
; 
const app = require('express')()
    , http = require('http').Server(app).listen(port)
    , bodyParser = require('body-parser')
    , mongoose = require('mongoose')
;

const userController = require('./controllers/user_controller')
    , challengeController = require('./controllers/challenge_controller')
;

const db = require('./mocks/createData');

mongoose.connect(mongooseUri, { useNewUrlParser: true })
    .then(() => {
        console.log('Connected...');
        db.createUsers();
        db.createChallenges();
    })
    .catch( error => {
        console.log('Something went wrong...', error);
        
    });


app.use(bodyParser.json({limit: '250mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '250mb', extended: true}));

app.use('/user', userController);
app.use('/challenge', challengeController);