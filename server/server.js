const express = require('express');
const models = require('./models');
const expressGraphQL = require('express-graphql').graphqlHTTP;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const schema = require('./schema/schema');

const app = express();

let MONGO_URI = ''
if (process.env.NODE_ENV === 'production') {
  console.log('prod mongo: ', process.env.NODE_ENV)
  MONGO_URI = process.env.MONGO_URI
} else {
  console.log('dev mongo instance: ', process.env.NODE_ENV)
  MONGO_URI = '';
}
// mongoLab URI
// const MONGO_URI = 'mongodb+srv://lyricaldb1:Odvlef5U5CedU2Nv@cluster0-epg5l.mongodb.net/test?retryWrites=true&w=majority';
if (!MONGO_URI) {
  throw new Error('You must provide a MongoLab URI');
}

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI, { useNewUrlParser: true });
mongoose.connection
    .once('open', () => console.log('Connected to MongoLab instance.'))
    .on('error', error => console.log('Error connecting to MongoLab:', error));

app.use(express.json());
app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}));

const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
app.use(webpackMiddleware(webpack(webpackConfig)));

module.exports = app;
