# Exercise Tracker API

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

CRUD API for storing a perisistent log of exercise activity

*Free Code Camp Back End Development and APIs project* - 
[Project Spec](https://www.freecodecamp.org/learn/apis-and-microservices/apis-and-microservices-projects/exercise-tracker)
### Install
- Run `npm install` to install dependencies
- Configure environment variables (see sample.env)
- Run `npm start` to launch server

### Usage
- Create User if needed
- Add exercises to log (forms provided in `views/index.html`)
- Retrieve log with optional filters

### API
`POST /api/users` - create new user - required fields: username (no pw)
`POST /api/users/{id}/exercises` - add exercise to user[id]
`GET /` - Forms / Usage view
`GET /api/users` - List all users
`GET /api/users/{id}/logs` - return exercise logs for user[id] - URL Query options: `from`=start date, `to`=end date, `limit`=number of queries
### Contributing
Not accepting PRs at this time. Contact erich@zenlex.dev with questions.

### License
[GNU General Public License](https://opensource.org/licenses/GPL-3.0)