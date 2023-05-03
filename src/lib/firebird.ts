var os = require("os");
var hostname = os.hostname();

export const options = {
  host: hostname == 'MacBook-Pro-de-Bruno.local' ? '192.168.15.175' : '192.168.16.158',
  port: 3050,
  database: hostname == 'MacBook-Pro-de-Bruno.local' ? 'C:/Questor/Questor-original-06-07-2022-01-12-46.FDB' : '/Dados/base-oficial/nQuestor.FDB',
  user: 'sysdba',
  password: hostname == 'MacBook-Pro-de-Bruno.local' ? 'masterkey' : 'dbaarq16',
  lowercase_keys: false,
  retryConnectionInterval: 1000,
  pageSize: 4096
}
