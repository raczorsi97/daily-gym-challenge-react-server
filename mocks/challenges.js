const challenges = [
    {
        'id': 1
        , 'title': 'Stair master challenge'
        , 'creation_date': '2016.05.12'
        , 'category': 'cardio'
        , 'dificulty': 'hard'
        , 'short_description': 'If you think you are strong enough for a good cardio session, we are challenging you to do 60 minutes on stair master......'
        , 'long_description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '
        , 'image': 'card_images/stairmaster.png'
        , 'in_progress': ['1','2','3','4','5']
        , 'completed': []
        , 'abandoned': []
        , 'ratings': [1, 2, 3, 4, 5]
        , 'rating': 3
    }
    , {
        'id': 2
        , 'title': 'Jumping jack challenge'
        , 'category': 'cardio'
        , 'dificulty': 'hard' 
        , 'short_description': 'A jumping jack is a physical jumping exercise performed by jumping to a position with the legs spread wide and the hands touching overhead. Let`s do it for 10 minutes!'
        , 'image': 'card_images/jumpingjacks.png'
        , 'in_progress': ['1']
        , 'completed': ['2']
        , 'abandoned': []
        , 'ratings': []
        , 'rating': 0
    }
    , {
        'id': 3
        , 'title': '30 minutes running'
        , 'creation_date': '2019.05.28'
        , 'category': 'cardio'
        , 'dificulty': 'medium'
        , 'short_description': 'Running is a method of terrestrial locomotion allowing humans and other animals to move rapidly on foot. Let`s see if you can do it for 30 minutes' 
        , 'long_description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '
        , 'image': 'card_images/run.jpg'
        , 'in_progress': ['1']
        , 'completed': []
        , 'abandoned': []
        , 'ratings': [1, 3]
        , 'rating': 2
    }
    , {
        'id': 4
        , 'title': 'Plank for 5 minutes'
        , 'creation_date': '2019.05.28'
        , 'category': 'strength'
        , 'dificulty': 'hard'
        , 'short_description': 'The plank is a core strength exercise that involves maintaining a position similar to a push-up for the maximum possible time. Let`s push your limits and do it for 5 minutes!' 
        , 'long_description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '
        , 'image': 'card_images/plank2.jpg'
        , 'in_progress': ['2', '3', '5']
        , 'completed': []
        , 'abandoned': []
        , 'ratings': []
        , 'rating': 1
    }
    , {
        'id': 5
        , 'title': 'Burpee challenge'
        , 'category': 'cardio'
        , 'dificulty': 'hard' 
        , 'short_description': 'The burpee, or squat thrust, is a full body exercise used in strength training and as an aerobic exercise. I bet you can`t do 50 by one rep.'
        , 'image': 'card_images/burpees.png'
        , 'in_progress': ['1']
        , 'completed': ['2']
        , 'abandoned': ['6','7']
        , 'ratings': [2, 2, 4, 4]
        , 'rating': 3
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
        , 'in_progress': ['2', '3', '5']
        , 'completed': []
        , 'abandoned': []
        , 'ratings': []
        , 'rating': 3
    }
    , {
        'id': 7
        , 'title': '500 squats challenge'
        , 'creation_date': '2019.05.12'
        , 'category': 'strength'
        , 'dificulty': 'medium'
        , 'short_description': 'A squat is a strength exercise in which the trainee lowers their hips from a standing position and then stands back up.' 
        , 'long_description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '
        , 'image': 'card_images/squat.jpg'
        , 'in_progress': []
        , 'completed': ['4']
        , 'abandoned': []
        , 'ratings': []
        , 'rating': 4
    }
];
module.exports = challenges;