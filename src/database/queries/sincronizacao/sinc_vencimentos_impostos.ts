import firebird from 'node-firebird'
import { options } from '../../../lib/firebird'

export function query_sinc_vencimentos_impostos() {


  const sql = `SELECT
  case when CODIGOIMPOSTO = 6106 then 3333 else CODIGOIMPOSTO end as CODIGOIMPOSTO,
  VARIACAOIMPOSTO,
  periodoapuracaoinicial,
  periodoapuracaofinal,
  vencimentoquota1,
  vencimentoquota2,
  vencimentoquota3
  FROM IMPOSTOVENCIMENTO`

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







