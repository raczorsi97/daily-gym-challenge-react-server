//challenge statuses: started - in progress - finished/abandoned

let users = [
    {
        'id': 1,
        'name': 'Deborah de Luca',
        'username': 'deborah',
        'password': 'test',
        'email': 'deborahl@gmail.com',
        'image': 'profile_pictures/deborah.png',
        'challenges': [{
            'id': 2
            , 'title': 'Jumping jack challenge'
            , 'category': 'cardio'
            , 'dificulty': 'hard' 
            , 'short_description': 'A jumping jack is a physical jumping exercise performed by jumping to a position with the legs spread wide and the hands touching overhead. Let`s do it for 10 minutes!'
            , 'image': 'card_images/jumpingjacks.png'
            , 'status': 'in_progress'
        }, 
        {
            'id': 5
            , 'title': 'Burpee challenge'
            , 'category': 'cardio'
            , 'dificulty': 'hard' 
            , 'short_description': 'The burpee, or squat thrust[citation needed], is a full body exercise used in strength training and as an aerobic exercise. I bet you can`t do 50 by one rep.'
            , 'image': 'card_images/burpees.png'
            , 'status': 'in_progress'
        },
        {
            'id': 3
            , 'title': '30 minutes running'
            , 'creation_date': '2019.05.28'
            , 'category': 'cardio'
            , 'dificulty': 'medium'
            , 'short_description': 'Running is a method of terrestrial locomotion allowing humans and other animals to move rapidly on foot. Let`s see if you can do it for 30 minutes' 
            , 'long_description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '
            , 'image': 'card_images/run.jpg'
            , 'status': 'in_progress'
        }],
        'completed_challenges': [],
        'abandoned_challenges': []
    },
    {
        'id': 2,
        'name': 'Boris Brejcha',
        'username': 'boris_b16',
        'email': 'boris_brejcha@yahoo.com',
        'password': 'test',
        'image': 'profile_pictures/boris.png',
        'challenges': [],
        'completed_challenges': [],
        'abandoned_challenges': []
      },
      {
        'id': 3,
        'name': 'Nina Kraviz',
        'username': 'kr_nina',
        'email': 'ninakr@gmail.com',
        'password': 'test',
        'image': 'profile_pictures/nina.png',
        'challenges': [],
        'completed_challenges': [],
        'abandoned_challenges': []
      },
      {
        'id': 4,
        'name': 'Solomun',
        'username': 'solomun1220',
        'email': 'mladen_solomun@gmail.com',
        'password': 'test',
        'image': 'profile_pictures/solomun.png',
        'challenges': [],
        'completed_challenges': [],
        'abandoned_challenges': []
      },
];

module.exports = users;