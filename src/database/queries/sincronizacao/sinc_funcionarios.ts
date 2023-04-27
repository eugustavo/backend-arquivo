import firebird from 'node-firebird'
import { options } from '../../../lib/firebird'

export function query_sinc_funcionarios() {


  const sql = `SELECT CODIGOEMPRESA, CODIGOESTAB, CODIGOFUNCCONTR, CODIGOFUNCPESSOA, CPFFUNC, cast(NOMEFUNC as varchar(120) character set win1252) as NOMEFUNC FROM SIGRA_SINC_FUNC`

  console.log(sql)

  return new Promise((resolve, reject) => {
    console.log('Chegou na Promise')
    firebird.attach(options, function (err: any, db: any): any {
      console.log('Chegou no Attach')
      if (err) {
        console.log('Chegou no Erro do Attach')
        console.error('Erro na Conexão: ', err)
        reject(err)
      }
      console.log('Chegou antes do DbQuery')
      db.query(sql, function (err: any, result: any): any {
        console.log('Chegou no DbQuery')
        if (err) {
          console.error('Erro na Query: ', err)
          reject(err)
        } else {
          console.log('Chegou no Else do DbQuery')
          console.log(result.length)
          resolve(result)
        }
        db.detach()
      })
    })
  })
}
