import firebird from 'node-firebird'
import { options } from '../../../src/lib/firebird'

export async function EmpresasAnalista(data1: any, data2: any, analista: any) {

  var pool = firebird.pool(5, options);

  const sql = "SELECT d.nomeusuario, b.INSCRFEDERAL, b.NOMEESTAB, b.CODIGOEMPRESA, b.CODIGOESTAB, count(a.CHAVENFEENT) registros FROM lctofisent a\
  INNER JOIN estab b ON (a.COMPLHIST = replace(b.INSCRESTAD, '.', '') and b.CVMAUDITOR = '"+ analista + "' and b.DATAENCERATIV = '2100-12-31' AND cast(substr(cast(a.CHAVENFEENT AS varchar(44)), 7, 20) AS varchar (14)) <> replace(replace(replace(b.INSCRFEDERAL, '.', ''), '-', ''), '/', ''))\
  LEFT JOIN lctofisent c ON (a.CHAVENFEENT = c.CHAVENFEENT AND c.CODIGOEMPRESA = b.CODIGOEMPRESA AND c.CODIGOESTAB = b.CODIGOESTAB)\
  LEFT JOIN USUARIO d ON (b.CVMAUDITOR = d.CODIGOUSUARIO)\
  WHERE a.codigoempresa = 9999\
  AND a.datalctofis BETWEEN '"+ data1 + "' AND '" + data2 + "'\
  AND a.CDSITUACAO = '0'\
  AND b.CODIGOESTAB IS NOT  NULL\
  AND a.chavenfeentref is null\
  AND c.CODIGOESTAB IS NULL\
  group by 1,2,3,4,5\
  order by 6 desc"

  // const sql = 'select first 1 * from estab'

  console.log(sql)

  return new Promise((resolve, reject) => {
    firebird.attach(options, function (err: any, db: any) {
      if (err) {
        console.error('Erro na Conexão: ', err);
        reject(err);
      }

      db.query(sql, function (err: any, result: any) {
        db.detach();
        if (err) {
          console.error('Erro na Query: ', err);
          reject(err);
        } else {
          console.log(result);
          resolve(result);
        }
      });
    });
  });
  
   
}
