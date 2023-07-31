import firebird from 'node-firebird'
import { options } from '../../../lib/firebird'

export function query_sat_55_emitidas() {


  const sql = `select 
  a.CODIGOEMPRESA,
  a.CODIGOESTAB ,
  b.NOMEESTAB,
  b.INSCRFEDERAL,
  b.CNPJ,
  b.CODIGOCONT,
  B.NOMECONT,
  B.USUARIOSAT,
  B.SENHASAT
         from
 (select
 distinct 
 a.CODIGOEMPRESA,
 a.CODIGOESTAB 
 from lctofissai a  
  where  a.codigoempresa <> 9999 and a.CDMODELO = '55' and a.datalctofis between '01.01.2022' and '31.12.2023') a
  inner join 
  ( select 
  b.CODIGOEMPRESA,
  b.CODIGOESTAB ,
  b.NOMEESTAB,
  b.INSCRFEDERAL,
 cast (replace(replace(replace(b.INSCRFEDERAL,'.',''),'/',''),'-','')as varchar (14)) CNPJ,
  d.CODIGOCONT,
  d.NOMECONT,
  d.USUARIOSAT,
  d.SENHASAT
   from estab b left join CFGEMPRESAGEM c on (b.CODIGOEMPRESA = c.CODIGOEMPRESA )
  left join contador d on (c.CONTADORRESPCNPJ = d.CODIGOCONT) 
  where b.DATAENCERATIV = '31.12.2100' and b.NOMEESTAB not like '%BASE%' and b.SIGLAESTADO = 'SC' ) b on (a.CODIGOEMPRESA = b.CODIGOEMPRESA and a.CODIGOESTAB = b.CODIGOESTAB)`

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
