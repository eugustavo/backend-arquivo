import firebird from 'node-firebird'
import { options } from '../../../../src/lib/firebird'

export function CfopProdutosDetalhe(data1: any, data2: any, empresa: any, estab: any) {

    const sql = `SELECT * FROM SIGRA_CFOP_PRODUTOS_DETALHE (${empresa}, ${estab}, ${data1}, ${data2})`

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
