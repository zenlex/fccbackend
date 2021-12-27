const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL);
const { Schema } = mongoose;

const exerciseSchema = new Schema({
  description: String,
  duration: Number,
  date: Date
})

const userSchema = new Schema({
  username: {
    type: String,
    required: false
  },
  exercises: [exerciseSchema]
})


const User = mongoose.model('User', userSchema);

// add new User
const addUser = async (name) => {
  const u = new User({ username: name });
  await u.save();
  const userObj = await User.findOne({ username: name }).select({ username: 1 });
  return userObj;
}
// add exercise entry
const addExercise = async ({ description, duration, date, id }) => {
  let retObj = {};
  if (!date) {
    date = new Date();
  } else date = new Date(date);
  const exObj = { description, duration, date };
  const updatedUser = await User.findByIdAndUpdate(id, { $push: { exercises: exObj } }, { new: true })
  retObj = {
    _id: updatedUser._id,
    username: updatedUser.username,
    date: date.toDateString(),
    duration: Number(duration), description
  }
  return retObj;

}
//get log
const getLog = async (id, { startDate, endDate, limit }) => {
  const user = await User.findById(id);
  let exercises = user.exercises;
  // filter exercise entries based on query string
  if (startDate) {
    exercises = exercises.filter(entry => entry.date > startDate)
  }
  if (endDate) {
    exercises = exercises.filter(entry => entry.date < endDate)
  }
  if (limit) {
    exercises = exercises.slice(0, limit);
  }
// format filtered exercise data
  exercises = exercises.map(entry => {
    return {
      description: entry.description,
      duration: entry.duration,
      date: entry.date.toDateString()
    }
  })
  
  // format return data
  const logObj = {
    username: user.username,
    count: exercises.length,
    _id: user._id,
    log: exercises
  }
  
  return logObj;
}

const getUsers = async () => {
  const users = await User.find();
  return users;
}

const getUsername = async (id) => {
  const user = await User.findById(id);
  return user.username || { error: 'invalid user id' };
}

module.exports = { addUser, addExercise, getLog, getUsers, getUsername };

