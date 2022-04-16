# URL Shortener Microservice

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

Generates a shortened URL and stores reference in MongoDB

*Free Code Camp Back End Development and APIs project*
[Project Spec](https://www.freecodecamp.org/learn/back-end-development-and-apis/back-end-development-and-apis-projects/url-shortener-microservice)

### Install
- Run `npm install` to install dependencies
- Configure environment variables (see `sample.env`)
- Run `npm start` to launch server

### Usage
Submit url to shorten via form at `/` or via form encoded `POST` request

### API
`GET /api/hello` - ping route

`POST /api/shorturl` returns JSON object with `original_url` and `short_url` fields

`GET /api/shorturl/{short_url}` returns original url
### Contributing
Not accepting PRs at this time. Contact erich@zenlex.dev with questions.

### License
[GNU General Public License](https://opensource.org/licenses/GPL-3.0)
