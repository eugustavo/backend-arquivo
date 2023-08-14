import firebird from 'node-firebird'
import { options } from '../../../lib/firebird'

export function query_sinc_operadores() {


  const sql = `
  SELECT 
  a.codigousuario,
  CAST(a.nomeusuario AS VARCHAR(120) CHARACTER SET WIN1252) AS nomeusuario,
  CAST(a.emailusuario AS VARCHAR(120) CHARACTER SET WIN1252) AS emailusuario,
  CASE WHEN nivelusuario = 2 THEN 'admin' ELSE 'user' END AS nivel,
  CAST(
      LIST(
          CAST(REPLACE(REPLACE(REPLACE(REPLACE(c.DESCRGRUPOUSUARIO, 'DS - Cadastro de Empresas', 'DS'), 'Financeiro', 'DA'), 'Qualidade', 'DA'), 'Administrador', 'ADM') AS VARCHAR(120) CHARACTER SET WIN1252),
          ','
      ) AS VARCHAR(120) CHARACTER SET WIN1252
  ) AS DESCRGRUPOUSUARIO
FROM USUARIO a
LEFT JOIN USUARIOGRUPOUSU b ON (a.CODIGOUSUARIO = b.CODIGOUSUARIO)
LEFT JOIN GRUPOUSUARIO c ON (b.CODIGOGRUPOUSUARIO = c.CODIGOGRUPOUSUARIO)
WHERE a.databaixausuario IS NULL
GROUP BY a.codigousuario, a.nomeusuario, a.emailusuario, nivel
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







