import firebird from 'node-firebird'
import { options } from '../../../src/lib/firebird'

export function EmpresasAnalista(data1: any, data2: any, analista: any) {

  // const sql = "SELECT D.NOMEUSUARIO USUARIO, B.INSCRFEDERAL CNPJ, B.NOMEESTAB NOME, B.CODIGOEMPRESA EMPRESA, B.CODIGOESTAB ESTAB, COUNT(A.CHAVENFEENT) REGISTROS FROM LCTOFISENT A INNER JOIN ESTAB B ON (A.COMPLHIST = REPLACE(B.INSCRESTAD, '.', '') AND B.CVMAUDITOR = "+ analista + " AND B.DATAENCERATIV = '2100-12-31' AND CAST(SUBSTR(CAST(A.CHAVENFEENT AS VARCHAR(44)), 7, 20) AS VARCHAR (14)) <> REPLACE(REPLACE(REPLACE(B.INSCRFEDERAL, '.', ''), '-', ''), '/', '')) LEFT JOIN LCTOFISENT C ON (A.CHAVENFEENT = C.CHAVENFEENT AND C.CODIGOEMPRESA = B.CODIGOEMPRESA AND C.CODIGOESTAB = B.CODIGOESTAB) LEFT JOIN USUARIO D ON (B.CVMAUDITOR = D.CODIGOUSUARIO) WHERE A.CODIGOEMPRESA = 9999 AND A.DATALCTOFIS BETWEEN '"+ data1 + "' AND '" + data2 + "' AND A.CDSITUACAO = '0' AND B.CODIGOESTAB IS NOT NULL AND A.CHAVENFEENTREF IS NULL AND C.CODIGOESTAB IS NULL GROUP BY 1,2,3,4,5 ORDER BY 6 DESC"

  const sql = "select * from teste"

  console.log(sql)

  return new Promise((resolve, reject) => {
    console.log('Chegou na Promise')
    firebird.attach(options, function (err: any, db: any):any {
      console.log('Chegou no Attach')
      if (err) {
        console.log('Chegou no Erro do Attach')
        console.error('Erro na Conexão: ', err);
        reject(err);
      }
      console.log('Chegou antes do DbQuery')
      db.query(sql, function (err: any, result: any): any {
        console.log('Chegou no DbQuery')
        if (err) {
          console.error('Erro na Query: ', err);
          reject(err);
        } else {
          console.log('Chegou no Else do DbQuery')
          console.log(result.length);
          resolve(result);
        }
        db.detach();
      });
    });
  });
}
