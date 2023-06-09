import firebird from 'node-firebird'
import { options } from '../../../../lib/firebird'

export function Query_CMI_Simples_Analistas() {

    const sql = `SELECT
        A.CODIGOEMPRESA,
        A.CODIGOESTAB,
        A.INSCRFEDERAL,
        cast(A.NOMEESTABCOMPLETO as varchar(120) character set win1252) as NOMEESTAB
        B.CODIGOUSUARIO,
        B.NOMEUSUARIO
        from  estab a left join usuario b on (a.CVMAUDITOR = B.CODIGOUSUARIO)
        WHERE A.DATAENCERATIV = '31.12.2100' AND A.CODIGOEMPRESA NOT IN  (1000)
        ORDER BY 1,2`

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
