const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

  Recipe.insertMany(data)
  .then(recipesArr => {
    recipesArr.forEach(recipe => {
      console.log(`New recipe created: ${recipe.title}`)
    })
  })
  .catch(err => console.log(`Error occurred: ${err}`));
setTimeout(() => {
  Recipe.updateOne(
    {title: 'Rigatoni alla Genovese'}, 
    { duration: 100 })
  .then(recipe => console.log(`Recipe deleted:`))
  .catch(err => console.log(`Error occurred: ${err}`));
}, 1500);
  
setTimeout(() => {
  Recipe.deleteOne({title: 'Carrot Cake'})
  .then(recipe => console.log(`Recipe deleted`))
  .catch(err => console.log(`Error occurred: ${err}`)); 
}, 1500);

setTimeout(() => {
mongoose.connection.close()
  .then(() => {
    console.log('Mongoose connection disconnected');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });
}, 2000); 