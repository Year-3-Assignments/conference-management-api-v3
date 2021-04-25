import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import pluginLoader from './lib/plugin.loader';
import responseHandler from './lib/response.handler';

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Server port number
const PORT = process.env.PORT || 9090;

// Register respond handler
app.use((req, res, next) => {
  req.handleResponse = responseHandler;
  next();
});

// Set root route of the API
app.route('/').get((req, res) => {
  res.send("WELCOME TO CONFERENCE API");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server start running on PORT ${PORT}`);
});

/* Start the plugin loader
  This plugin loader will establish the connection with the mongodb
  database and load API routes to provide API endpoints to the user
*/
pluginLoader(app);
