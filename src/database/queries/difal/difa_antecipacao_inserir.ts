import firebird from 'node-firebird'
import { options } from '../../../lib/firebird'

export function Dif_Difa_Inserir(
    empresa: any,
    estab: any,
    chavelcto: any,
    seq: any,
    datalcto: any,
    codigoproduto: any,
    aliqicms: any,
    codigocfop: any,
    bccalculada: any,
    valorcalculado: any
) {

    const sql = `INSERT INTO lctofisentsubtribut (CODIGOEMPRESA, CODIGOESTAB, CHAVELCTOFISENT, SEQ, DATALCTOFIS, CODIGOPRODUTO, ALIQIMPOSTOCFOP, CODIGOCFOP, VALORSUBTRIBUT, BASECALCULOSUBTRIBUT, VALORDESPESA, CODIGOANTECIPACAO, CODIGOOPERACAOFIS)
    VALUES (${empresa}, ${estab}, '${chavelcto}', ${seq}, '${datalcto}', '${codigoproduto}', '${aliqicms}', '${codigocfop}', '${valorcalculado}', '${bccalculada}',0,2,11675)`

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
