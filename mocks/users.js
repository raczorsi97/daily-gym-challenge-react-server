//challenge statuses: started - in progress - finished/abandoned

let users = [
    {
        'id': 1,
        'name': 'Deborah de Luca',
        'username': 'test',
        'password': 'test',
        'email': 'deby@gmail.com',
        'challenges': [{
            'id': 5
            , 'title': 'Burpee challenge'
            , 'category': 'cardio'
            , 'dificulty': 'hard' 
            , 'short_description': 'The burpee, or squat thrust[citation needed], is a full body exercise used in strength training and as an aerobic exercise. I bet you can`t do 50 by one rep.'
            , 'image': 'card_images/burpees.png'
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