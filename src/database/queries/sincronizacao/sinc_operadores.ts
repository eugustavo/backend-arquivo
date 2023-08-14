import firebird from 'node-firebird'
import { options } from '../../../lib/firebird'

export function query_sinc_operadores() {


  const sql = `
  select 
a.codigousuario,
cast(a.nomeusuario as varchar(120) character set win1252) as nomeusuario,
cast(a.emailusuario as varchar(120) character set win1252) as emailusuario,
case when nivelusuario = 2 then 'admin' ELSE 'user' end as nivel,
replace (replace (replace (replace (c.DESCRGRUPOUSUARIO,'DS - Cadastro de Empresas','DS'),'Financeiro','DA'),'Qualidade','DA'),'Administrador','ADM') DESCRGRUPOUSUARIO
 from usuario a left join USUARIOGRUPOUSU b on (a.CODIGOUSUARIO = b.CODIGOUSUARIO)
 left join grupousuario c on (b.CODIGOGRUPOUSUARIO = c.CODIGOGRUPOUSUARIO)
  where b.CODIGOGRUPOUSUARIO in (4,7,10,22,509,516,1,517)
  `

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







