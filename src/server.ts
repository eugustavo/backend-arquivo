import { app } from './app'
import { env } from './env'

const Versao =  require('../package.json').version

app
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(() => console.log('HTTP Server is running on version ' + Versao))
