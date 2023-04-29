import firebird from 'node-firebird'
import { options } from '../../../lib/firebird'

export function Dif_Update_Aliq(empresa: any, produto: any, aliq: any) {

    const sql = `EXECUTE PROCEDURE SIGRA_DIFAL_UPDATE_ALIQ('${empresa}', '${produto}', '${aliq}')`

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
                    resolve(result)
                }
                db.detach()
            })
        })
    })
}
