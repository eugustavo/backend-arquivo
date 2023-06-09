import firebird from 'node-firebird'
import { options } from '../../../lib/firebird'

export function Query_CMI_Canais_Envio(data1: any) {

    const sql = `SELECT
        CODIGOEMPRESA,
        CODIGOESTAB,
        CODIGOSEGMENTO,
        cast(DESCRSEGMENTO as varchar(120) character set win1252) as DESCRSEGMENTO
        FROM SIGRA_CMI_CANAIS_ENVIO ('${data1}')`

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
