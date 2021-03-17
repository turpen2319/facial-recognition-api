const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const imageScore = require('./controllers/image-score');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'dbII2',
    database : 'smartbrain'
  }
});

//prints all data from the db 
// db.select('*').from('users').then(data => {
// 	console.log(data);
// })

const app = express();
const saltRounds = 10; //bcrypt param

app.use(cors())
//use this middleware so chrome lets us connect to our server?

app.use(express.json()); 
//need to use this cause otherwise 
// express doesn't know what we sent over...
// in order to use req.body etc.
//this is middleware


app.get('/', (req, res) => {
	res.send('success')
})

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt)})

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt, saltRounds)}) //this is called dependency injection

app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db)})

app.put('/image-score', (req, res) => { imageScore.handleScore(req, res, db)})

app.put('/imageurl', (req, res) => { imageScore.handleApiCall(req, res)})

// const PORT = process.env.PORT; //this is an environmental variable...used for
//                                  keeping things dynamic or secret. When we deploy
//																	 we don't know what port it will run on

// declare env variables in terminal using bash    PORT=3000 node server.js
const PORT = 3001;
app.listen(PORT, ()=> {
	console.log(`Server is running on port ${PORT}`);
})




/*

below are all of my planned endpoints
(the forward slashes aren't comments, they're
part of our enpdpoint routes)

/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = returns new user
/profile/:userId --> GET = user
/image-score --> PUT --> user

*/ 