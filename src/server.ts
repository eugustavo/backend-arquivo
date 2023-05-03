import { app } from './app'
import { env } from './env'
var os = require("os");
var hostname = os.hostname();

app
  .listen({
    host: '0.0.0.0',
    port: env.PORT
  })
  .then(() => console.log('HTTP Server is running on version ' + require('../package.json').version) + ' at ' + hostname)
