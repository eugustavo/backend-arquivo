import firebird from 'node-firebird'
import { options } from '../../../lib/firebird'

export function query_nfs_analista(data1: any, data2: any, analista: any) {

  function converteData(dataInformada: string): string {
    let data = dataInformada.split('/')
    return data[2] + '-' + data[1] + '-' + data[0]
  }

  const sql = `SELECT * FROM SIGRA_NFS_ANALISTA(${analista}, '${converteData(data1)}', '${converteData(data2)}')`

  console.log(sql)

  return new Promise((resolve, reject) => {
    console.log('Chegou na Promise')
    firebird.attach(options, function (err: any, db: any): any {
      console.log('Chegou no Attach')
      if (err) {
        console.log('Chegou no Erro do Attach')
        console.error('Erro na Conexão: ', err)
        reject(err)
        return
      }
      console.log('Chegou antes do DbQuery')
      db.query(sql, function (err: any, result: any): any {
        console.log('Chegou no DbQuery')
        db.detach()
        if (err) {
          console.error('Erro na Query: ', err)
          reject(err)
          return
        } else {
          console.log('Chegou no Else do DbQuery')
          console.log(result.length)
          resolve(result)
        }
      })
      db.detach()
    })
  })
}
