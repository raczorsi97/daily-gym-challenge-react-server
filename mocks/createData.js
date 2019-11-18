const UserModel = require('../schemas/userSchema')
    , ChallengeModel = require('../schemas/challengeSchema')
;

let users = [
    {
        'name': 'Deborah de Luca',
        'username': 'deborah',
        'password': 'test',
        'email': 'deborahl@gmail.com',
        'image': 'profile_pictures/deborah.png',
        'challenges': ['1','2', '3', '5'],
        'completed_challenges': [],
        'abandoned_challenges': []
    },
    {
       'name': 'Boris Brejcha',
        'username': 'boris_b16',
        'email': 'boris_brejcha@yahoo.com',
        'password': 'test',
        'image': 'profile_pictures/boris.png',
        'challenges': ['1', '4', '6'],
        'completed_challenges': ['2', '5'],
        'abandoned_challenges': []
    },
    {
        'name': 'Nina Kraviz',
        'username': 'kr_nina',
        'email': 'ninakr@gmail.com',
        'password': 'test',
        'image': 'profile_pictures/nina.png',
        'challenges': ['1', '4', '6'],
        'completed_challenges': [],
        'abandoned_challenges': []
    },
    {
       'name': 'Solomun',
        'username': 'solomun1220',
        'email': 'mladen_solomun@gmail.com',
        'password': 'test',
        'image': 'profile_pictures/solomun.png',
        'challenges': ['1', '7'],
        'completed_challenges': ['7'],
        'abandoned_challenges': []
    },
    {
       'name': 'Marco Carola',
        'username': 'marco_crl',
        'email': 'marco_crl@gmail.com',
        'password': 'test',
        'image': 'profile_pictures/marco.png',
        'challenges': ['1', '4', '6'],
        'completed_challenges': [],
        'abandoned_challenges': []
    },
    {
       'name': 'Richardo Villalobos',
        'username': 'vl_richardo',
        'email': 'vl_richardo@gmail.com',
        'password': 'test',
        'image': 'profile_pictures/villalobos.png',
        'challenges': [],
        'completed_challenges': [],
        'abandoned_challenges': ['5']
    },
    {
        'name': 'Petre Inspirescu',
        'username': 'petre_inspirescu',
        'email': 'inspirescu@gmail.com',
        'password': 'test',
        'image': 'profile_pictures/inspirescu.png',
        'challenges': [],
        'completed_challenges': [],
        'abandoned_challenges': ['5']
    },
]
, challenges = [
    {
       'title': 'Stair master challenge'
        , 'creation_date': '2016.05.12'
        , 'category': 'cardio'
        , 'dificulty': 'hard'
        , 'short_description': 'If you think you are strong enough for a good cardio session, we are challenging you to do 60 minutes on stair master......'
        , 'long_description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '
        , 'image': 'card_images/stairmaster.png'
        , 'in_progress': []
        , 'completed': []
        , 'abandoned': []
        , 'ratings': [2, 4]
        , 'rating': 3
    }
    , {
        'title': 'Jumping jack challenge'
        , 'category': 'cardio'
        , 'dificulty': 'hard' 
        , 'short_description': 'A jumping jack is a physical jumping exercise performed by jumping to a position with the legs spread wide and the hands touching overhead. Let`s do it for 10 minutes!'
        , 'long_description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '
        , 'image': 'card_images/jumpingjacks.png'
        , 'in_progress': []
        , 'completed': []
        , 'abandoned': []
        , 'ratings': []
        , 'rating': 0
    }
    , {
        'title': '30 minutes running'
        , 'creation_date': '2019.05.28'
        , 'category': 'cardio'
        , 'dificulty': 'medium'
        , 'short_description': 'Running is a method of terrestrial locomotion allowing humans and other animals to move rapidly on foot. Let`s see if you can do it for 30 minutes' 
        , 'long_description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '
        , 'image': 'card_images/run.jpg'
        , 'in_progress': []
        , 'completed': []
        , 'abandoned': []
        , 'ratings': [1, 3]
        , 'rating': 2
    }
    , {
        'title': 'Plank for 5 minutes'
        , 'creation_date': '2019.05.28'
        , 'category': 'strength'
        , 'dificulty': 'hard'
        , 'short_description': 'The plank is a core strength exercise that involves maintaining a position similar to a push-up for the maximum possible time. Let`s push your limits and do it for 5 minutes!' 
        , 'long_description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '
        , 'image': 'card_images/plank2.jpg'
        , 'in_progress': []
        , 'completed': []
        , 'abandoned': []
        , 'ratings': []
        , 'rating': 0
    }
    , {
        'title': 'Burpee challenge'
        , 'category': 'cardio'
        , 'dificulty': 'hard' 
        , 'short_description': 'The burpee, or squat thrust, is a full body exercise used in strength training and as an aerobic exercise. I bet you can`t do 50 by one rep.'
        , 'long_description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '
        , 'image': 'card_images/burpees.png'
        , 'in_progress': []
        , 'completed': []
        , 'abandoned': []
        , 'ratings': [2, 2, 4, 4]
        , 'rating': 3
    }, 
    {
        'title': 'Plank for 60 seconds'
        , 'creation_date': '2019.05.28'
        , 'category': 'strength'
        , 'dificulty': 'easy'
        , 'short_description': 'The plank is a core strength exercise that involves maintaining a position similar to a push-up for the maximum possible time. Let`s keep it simple and do it for 60 seconds.' 
        , 'long_description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '
        , 'image': 'card_images/plank.jpg'
        , 'in_progress': []
        , 'completed': []
        , 'abandoned': []
        , 'ratings': []
        , 'rating': 0
    }
    , {
        'title': '500 squats challenge'
        , 'creation_date': '2019.05.12'
        , 'category': 'strength'
        , 'dificulty': 'medium'
        , 'short_description': 'A squat is a strength exercise in which the trainee lowers their hips from a standing position and then stands back up.' 
        , 'long_description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '
        , 'image': 'card_images/squat.jpg'
        , 'in_progress': []
        , 'completed': []
        , 'abandoned': []
        , 'ratings': []
        , 'rating': 0
    }
];

createUsers = () => {
    UserModel.collection.drop();
    users.forEach( user => {
        UserModel.create({
            name: user.name,
            username: user.username,
            password: user.password,
            email: user.email,
            image: user.image,
            challenges: [],
            completed_challenges: [],
            abandoned_challenges: [] 
        }, (err, user) => {
            if(err) {
                return console.log('Error creating user :', err);
            } 
            return console.log('Inserted user :', user.name);
        })
    });
}

createChallenges = () => {
    ChallengeModel.collection.drop();
    challenges.forEach( challenge => {
        ChallengeModel.create({
            title: challenge.title
            , creation_date: challenge.date
            , category: challenge.category
            , difficulty: challenge.difficulty
            , short_description: challenge.short_description
            , long_description: challenge.long_description
            , image: challenge.image
            , in_progress: []
            , completed: []
            , abandoned: []
            , ratings: []
            , rating: 0
        }, (err, challenge) => {
            if(err) {
                return console.log('Error creating user :', err);
            } 
            return console.log('Inserted challenge :', challenge.title);
        });
    });
}

module.exports = {
    createUsers
    , createChallenges
};