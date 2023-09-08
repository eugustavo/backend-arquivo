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

import moment from 'moment';
import schedule from 'node-schedule';
import { app } from './app';
import { env } from './env';

import {
  job_sat_grava_questor,
  job_sinc_contas_banco_ctb,
  job_sinc_empresas,
  job_sinc_empresas_sat,
  job_sinc_funcionarios
} from './http/controllers/jobs/sincronizacao';

var os = require("os");
var hostname = os.hostname();


const jobSincronizacao = schedule.scheduleJob('0 19 * * *', async function () {
  console.log('Iniciando Job Agendado de Sincronização de Funcionários em ' + moment().format('DD/MM/YYYY HH:mm:ss'));
  await job_sinc_funcionarios()
  console.log('Finalizando Job Agendado de Sincronização de Funcionários em ' + moment().format('DD/MM/YYYY HH:mm:ss'));
  console.log('Iniciando Job Agendado de Sincronização de Empresas em ' + moment().format('DD/MM/YYYY HH:mm:ss'));
  await job_sinc_empresas()
  console.log('Finalizando Job Agendado de Sincronização de Empresas em ' + moment().format('DD/MM/YYYY HH:mm:ss'));
  console.log('Iniciando Job Agendado de Sincronização de Empresas SAT em ' + moment().format('DD/MM/YYYY HH:mm:ss'));
  await job_sinc_empresas_sat()
  console.log('Finalizando Job Agendado de Sincronização de Empresas SAT em ' + moment().format('DD/MM/YYYY HH:mm:ss'));
  console.log('Iniciando Job Agendado de Sincronização de Contas Contábeis Bancárias em ' + moment().format('DD/MM/YYYY HH:mm:ss'));
  await job_sinc_contas_banco_ctb()
  console.log('Finalizando Job Agendado de Sincronização de Contas Contábeis Bancárias em ' + moment().format('DD/MM/YYYY HH:mm:ss'));

});

const jobSatQuestor = schedule.scheduleJob('0 22 * * *', async function () {
  console.log('Iniciando Job Agendado SAT QUESTOR em ' + moment().format('DD/MM/YYYY HH:mm:ss'));
  await job_sat_grava_questor()
  console.log('Finalizando Job Agendado SAT QUESTOR em ' + moment().format('DD/MM/YYYY HH:mm:ss'));

});



app
  .listen({
    host: '0.0.0.0',
    port: env.PORT
  })
  .then(() => console.log('HTTP Server is running on version ' + require('../package.json').version) + ' at ' + hostname)
