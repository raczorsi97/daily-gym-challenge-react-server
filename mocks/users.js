//challenge statuses: started - in progress - finished/abandoned

let users = [
    {
        'id': 1,
        'name': 'Deborah de Luca',
        'username': 'deborah',
        'password': 'test',
        'email': 'deborahl@gmail.com',
        'image': 'profile_pictures/deborah.png',
        'challenges': ['2', '3', '5'],
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
        'challenges': [{
            'id': 4
            , 'title': 'Plank for 5 minutes'
            , 'creation_date': '2019.05.28'
            , 'category': 'strength'
            , 'dificulty': 'hard'
            , 'short_description': 'The plank is a core strength exercise that involves maintaining a position similar to a push-up for the maximum possible time. Let`s push your limits and do it for 5 minutes!' 
            , 'long_description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '
            , 'image': 'card_images/plank2.jpg'
            , 'status': 'in_progress'
            , 'users' : []
            , 'rating': 10
        },
        {
            'id': 6
            , 'title': 'Plank for 60 seconds'
            , 'creation_date': '2019.05.28'
            , 'category': 'strength'
            , 'dificulty': 'easy'
            , 'short_description': 'The plank is a core strength exercise that involves maintaining a position similar to a push-up for the maximum possible time. Let`s keep it simple and do it for 60 seconds.' 
            , 'long_description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '
            , 'image': 'card_images/plank.jpg'
            , 'status': 'in_progress'
            , 'users' : []
        }],
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
        'challenges': [{
            'id': 4
            , 'title': 'Plank for 5 minutes'
            , 'creation_date': '2019.05.28'
            , 'category': 'strength'
            , 'dificulty': 'hard'
            , 'short_description': 'The plank is a core strength exercise that involves maintaining a position similar to a push-up for the maximum possible time. Let`s push your limits and do it for 5 minutes!' 
            , 'long_description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '
            , 'image': 'card_images/plank2.jpg'
            , 'status': 'in_progress'
            , 'users' : []
        },
        {
            'id': 6
            , 'title': 'Plank for 60 seconds'
            , 'creation_date': '2019.05.28'
            , 'category': 'strength'
            , 'dificulty': 'easy'
            , 'short_description': 'The plank is a core strength exercise that involves maintaining a position similar to a push-up for the maximum possible time. Let`s keep it simple and do it for 60 seconds.' 
            , 'long_description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '
            , 'image': 'card_images/plank.jpg'
            , 'status': 'in_progress'
            , 'users' : []
        }],
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
        'completed_challenges': [{
            'id': 7
            , 'title': '500 squats challenge'
            , 'creation_date': '2019.05.12'
            , 'category': 'strength'
            , 'dificulty': 'medium'
            , 'short_description': 'A squat is a strength exercise in which the trainee lowers their hips from a standing position and then stands back up.' 
            , 'long_description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '
            , 'image': 'card_images/squat.jpg'
            , 'users' : []
        }],
        'abandoned_challenges': []
      },
      {
        'id': 5,
        'name': 'Marco Carola',
        'username': 'marco_crl',
        'email': 'marco_crl@gmail.com',
        'password': 'test',
        'image': 'profile_pictures/marco.png',
        'challenges': [{
            'id': 4
            , 'title': 'Plank for 5 minutes'
            , 'creation_date': '2019.05.28'
            , 'category': 'strength'
            , 'dificulty': 'hard'
            , 'short_description': 'The plank is a core strength exercise that involves maintaining a position similar to a push-up for the maximum possible time. Let`s push your limits and do it for 5 minutes!' 
            , 'long_description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '
            , 'image': 'card_images/plank2.jpg'
            , 'status': 'in_progress'
            , 'users' : []
        },
        {
            'id': 6
            , 'title': 'Plank for 60 seconds'
            , 'creation_date': '2019.05.28'
            , 'category': 'strength'
            , 'dificulty': 'easy'
            , 'short_description': 'The plank is a core strength exercise that involves maintaining a position similar to a push-up for the maximum possible time. Let`s keep it simple and do it for 60 seconds.' 
            , 'long_description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '
            , 'image': 'card_images/plank.jpg'
            , 'status': 'in_progress'
            , 'users' : []
        }],
        'completed_challenges': [],
        'abandoned_challenges': []
      },
      {
        'id': 6,
        'name': 'Richardo Villalobos',
        'username': 'vl_richardo',
        'email': 'vl_richardo@gmail.com',
        'password': 'test',
        'image': 'profile_pictures/villalobos.png',
        'challenges': [],
        'completed_challenges': [],
        'abandoned_challenges': []
      },
      {
        'id': 7,
        'name': 'Petre Inspirescu',
        'username': 'petre_inspirescu',
        'email': 'inspirescu@gmail.com',
        'password': 'test',
        'image': 'profile_pictures/inspirescu.png',
        'challenges': [],
        'completed_challenges': [],
        'abandoned_challenges': []
      },
];

module.exports = users;