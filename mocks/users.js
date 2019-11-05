//challenge statuses: started - in progress - finished/abandoned

let users = [
    {
        'id': 1,
        'name': 'Deborah de Luca',
        'username': 'test',
        'password': 'test',
        'email': 'deby@gmail.com',
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
        'name': 'Leanne Graham',
        'username': 'bret',
        'email': 'Sincere@april.biz',
        'password': 'test',
        'challenges': [],
        'completed_challenges': [],
        'abandoned_challenges': []
      },
      {
        'id': 3,
        'name': 'Ervin Howell',
        'username': 'antonette',
        'email': 'Shanna@melissa.tv',
        'password': 'test',
        'challenges': [],
        'completed_challenges': [],
        'abandoned_challenges': []
      },
];

module.exports = users;