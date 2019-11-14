//challenge statuses: started - in progress - finished/abandoned

let users = [
    {
        'id': 1,
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
        'id': 2,
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
        'id': 3,
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
        'id': 4,
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
        'id': 5,
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
        'id': 6,
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
        'id': 7,
        'name': 'Petre Inspirescu',
        'username': 'petre_inspirescu',
        'email': 'inspirescu@gmail.com',
        'password': 'test',
        'image': 'profile_pictures/inspirescu.png',
        'challenges': [],
        'completed_challenges': [],
        'abandoned_challenges': ['5']
      },
];

module.exports = users;