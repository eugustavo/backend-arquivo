import firebird from 'node-firebird'
import { options } from '../../../lib/firebird'

export function Query_Listas_Cst_Icms() {

    const sql = `select distinct lpad(CST, 3, '0') CST from CFGIMPSPEDFISICMS ORDER BY 1`

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
