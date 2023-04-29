import firebird from 'node-firebird'
import { options } from '../../../lib/firebird'

export function Query_Difal_Ref_Prod_Eu(data1: any, data2: any, analista: any) {

    const sql = `SELECT * FROM SIGRA_DIFAL_PROD_REV_EU ('${data1}', '${data2}', '${analista}')`

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
