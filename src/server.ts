const fs = require('fs');


process.on('uncaughtException', (error) => {
  console.error('Erro não tratado:', error);
  logError(error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Rejeição não tratada:', reason);
  logError(reason);
});

function logError(error: any) {
  const logMessage = `Data/Hora: ${new Date().toISOString()}\nErro: ${error.stack}\n\n`;

  fs.appendFile('error.log', logMessage, (err: any) => {
    if (err) {
      console.error('Erro ao gravar o log de erro:', err);
    }
  });
}

import { app } from './app'
import { env } from './env'
import schedule from 'node-schedule';
import moment from 'moment';

import {
  job_sinc_funcionarios,
  job_sinc_empresas,
  job_sinc_contas_banco_ctb
} from './http/controllers/jobs/sincronizacao';

var os = require("os");
var hostname = os.hostname();


const jobSincronizacao = schedule.scheduleJob('0 0 22 * * *', async function () {
  console.log('Iniciando Job Agendado de Sincronização de Funcionários em ' + moment().format('DD/MM/YYYY HH:mm:ss'));
  await job_sinc_funcionarios()
  console.log('Finalizando Job Agendado de Sincronização de Funcionários em ' + moment().format('DD/MM/YYYY HH:mm:ss'));
  console.log('Iniciando Job Agendado de Sincronização de Empresas em ' + moment().format('DD/MM/YYYY HH:mm:ss'));
  await job_sinc_empresas()
  console.log('Finalizando Job Agendado de Sincronização de Empresas em ' + moment().format('DD/MM/YYYY HH:mm:ss'));
  console.log('Iniciando Job Agendado de Sincronização de Contas Contábeis Bancárias em ' + moment().format('DD/MM/YYYY HH:mm:ss'));
  await job_sinc_contas_banco_ctb()
  console.log('Finalizando Job Agendado de Sincronização de Contas Contábeis Bancárias em ' + moment().format('DD/MM/YYYY HH:mm:ss'));

});



app
  .listen({
    host: '0.0.0.0',
    port: env.PORT
  })
  .then(() => console.log('HTTP Server is running on version ' + require('../package.json').version) + ' at ' + hostname)
