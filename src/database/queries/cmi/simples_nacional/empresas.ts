import firebird from 'node-firebird'
import { options } from '../../../../lib/firebird'

export function Query_CMI_Simples_Empresas(data1: any) {

    const sql = `SELECT
        CODIGOEMPRESA,
        CODIGOESTAB,
        INSCRFEDERAL,
        '1449' as CODIGOIMPOSTO,
        cast(NOMEESTAB as varchar(120) character set win1252) as NOMEESTAB,
        CODIGOEMPRESA_CODIGOESTAB,
        cast(ULTIMA_OPCAO as date) as ULTIMA_OPCAO
        FROM SIGRA_CMI_SIMPLES_EMPRESAS ('${data1}')`

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
