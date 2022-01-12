const environment = require('./services/environment');
const { initialize } = require('./services/database');

// get the database setup before anything else
initialize();

const app = require('./app')();
const port = environment.port;
app.listen(port, () => console.log(`Advisor API listening on port ${port}!`));
