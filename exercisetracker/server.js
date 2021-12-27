const express = require('express')
const app = express()
const cors = require('cors')
const { addUser, addExercise, getLog, getUsers, getUsername } = require('./tracker');
const bodyParser = require('body-parser')


app.use(cors())
app.use(express.static('public'))
// app.use(bodyParser.json());
app.use('/api/', bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.get('/api/users', async function(req, res) {
  const users = await getUsers();
  res.send(users);
})

app.post('/api/users', async function(req, res) {
  const username = req.body.username;
  if (!username) {
    res.send({ error: 'Invalid Username' });
  } else {
    const newUser = await addUser(username);
    //const newUser = ({username: 'test', id: 'test'})
    res.send(newUser);
  }
})

app.post('/api/users/:id/exercises', async function(req, res) {
  const { description, duration, date } = req.body;
  const user = await addExercise({ description, duration, date, id: req.params.id })
  res.send(user);
})

app.get('/api/users/:id/logs', async function(req, res) {
  const userid = req.params.id;
  const startDate = req.query.from ? new Date(req.query.from) : null;
  const endDate = req.query.to ? new Date(req.query.to) : null;
  const limit = req.query.limit;
  const log = await getLog(userid, { startDate, endDate, limit });
  res.send(log);
})


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
