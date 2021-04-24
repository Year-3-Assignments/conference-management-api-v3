import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import pluginLoader from './lib/plugin.loader';

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Server port number
const PORT = process.env.PORT || 9090;

// Start the server
app.listen(PORT, () => {
  console.log(`Server start running on PORT ${PORT}`);
});

/* Start the plugin loader
  This plugin loader will establish the connection with the mongodb
  database and load API routes to provide API endpoints to the user
*/
pluginLoader(app);
