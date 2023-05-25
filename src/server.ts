import { app } from './app'
import { env } from './env'
import schedule from 'node-schedule';
import moment from 'moment';

import { job_sinc_funcionarios } from './http/controllers/jobs/sincronizacao';

var os = require("os");
var hostname = os.hostname();


const jobSincronizacao = schedule.scheduleJob('0 45 16 * * *', async function () {
  console.log('Iniciando Job Agendado de Sincronização de Funcionários em ' + moment().format('DD/MM/YYYY HH:mm:ss'));
  await job_sinc_funcionarios()
  console.log('Finalizando Job Agendado de Sincronização de Funcionários em ' + moment().format('DD/MM/YYYY HH:mm:ss'));

});



app
  .listen({
    host: '0.0.0.0',
    port: env.PORT
  })
  .then(() => console.log('HTTP Server is running on version ' + require('../package.json').version) + ' at ' + hostname)
