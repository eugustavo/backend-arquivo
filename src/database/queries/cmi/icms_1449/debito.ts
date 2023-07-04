import firebird from 'node-firebird'
import { options } from '../../../../lib/firebird'

export function Query_CMI_Icms_1449_Debito(data1: any) {

    const sql = `select 
    c.CODIGOGRUPOIMPOSTO,
    b.CODIGOEMPRESA,
    B.CODIGOESTAB,
    e.INSCRFEDERAL,
    B.DATALCTOCTR,
    b.CODIGOIMPOSTO,
    b.VARIACAOIMPOSTO,
    b.VALORDEBITO,
    b.DATAVENCIMENTO,
    c.DESCRIMPOSTO,
    b.DATAHORADEBITO,
    e.NOMEESTABCOMPLETO from 
    DEBITOESTADUAL b left join IMPOSTO c on (b.CODIGOIMPOSTO = c.CODIGOIMPOSTO and b.VARIACAOIMPOSTO = c.VARIACAOIMPOSTO)
    left join usuario d on (b.CODIGOUSUARIO = d.CODIGOUSUARIO)
    left join estab e on (B.CODIGOEMPRESA = e.CODIGOEMPRESA and B.CODIGOESTAB = e.CODIGOESTAB)
    where  b.DATALCTOCTR = '${data1}' and c.CODIGOGRUPOIMPOSTO in ( '2.01' ) and b.CODIGOIMPOSTO not in (1473,1740,2496,2569)`

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