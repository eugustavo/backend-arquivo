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
    firebird.attach(options, function (err: any, db: any): any {
      if (err) {
        console.error('Erro na Conexão: ', err)
        reject(err)
      }
      console.log('Chegou antes do DbQuery')
      db.query(sql, function (err: any, result: any): any {
        if (err) {
          console.error('Erro na Query: ', err)
          reject(err)
        } else {
          console.log(result.length)
          resolve(result)
        }
        db.detach()
      })
    })
  })
}
