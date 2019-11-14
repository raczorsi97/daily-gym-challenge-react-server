const app = require('express')();
const http = require('http').Server(app).listen(3001);
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const uri = "mongodb+srv://test:test@dailygymchallenge-dmpss.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(uri, {useNewUrlParser: true})
    .then(() => {
        console.log('Connected');
    })
    .catch( error => {
        console.log('Something went wrong...');
    });

let db = mongoose.connection;

console.log(db)
;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('open', (ref) => {
    mongoose.connection.db.listCollections().toArray(function (err, names) {
        console.log('Names :', names); // [{ name: 'dbname.myCollection' }]
        module.exports.Collection = names;
    });
});
// , (err, client) => {
//     if(err) {
//         console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
//     }
//     collection = client.db("DailyGymChallenge").collection("Users");
//     console.log('Connected...', collection);
//     collection.find({}, (err, resp) => {
//         if (resp) {
//             resp.each((err, docs) => {
//                 console.log(docs);
//             });
//         }
//     });
//     client.close();
// });


app.use(bodyParser.json({limit: '250mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '250mb', extended: true}));

const userController = require('./controllers/user_controller')
    , postController = require('./controllers/post_controller')
    , challengeController = require('./controllers/challenge_controller')
;

app.use('/user', userController);
app.use('/post', postController);
app.use('/challenge', challengeController);