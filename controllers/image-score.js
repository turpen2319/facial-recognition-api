const Clarifai = require('clarifai');

//Add your api key between the single quotes
const app = new Clarifai.App({
 apiKey: '9d0bc6f8daa74935b7978ff4186888df'
});

const handleApiCall = (req, res) => {
	app.models
		.predict(Clarifai.FACE_DETECT_MODEL, req.body.input) //using imageUrl wouldn't have worked...see setState() react docs 
		.then(data => {
			res.json(data);
		})
		.catch(err => res.status(400).json('unable to work with API'))
}

const handleScore = (req, res, db) => {
	const { id } = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
  	res.json(entries[0]);
  })
  .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
	handleScore: handleScore
};