import firebird from 'node-firebird'
import { options } from '../../../../lib/firebird'

export function Query_CMI_Pis_Cofins_Apuracao(data1: any) {

    const sql = `select 
    a.CODIGOEMPRESA,
    a.CODIGOESTAB,
    a.TIPOIMPOSTO,
    a.DATAINICIAL,
    e.INSCRFEDERAL,
    a.CODIGOUSUARIO,
    d.NOMEUSUARIO,
    a.DATAHORAUSUARIO,
    e.NOMEESTABCOMPLETO
     from periodoapuradofis a 
    left join usuario d on (a.CODIGOUSUARIO = d.CODIGOUSUARIO)
    left join estab e on (a.CODIGOEMPRESA = e.CODIGOEMPRESA and a.CODIGOESTAB = e.CODIGOESTAB)
    where  a.DATAINICIAL = '${data1}' and a.tipoimposto = (76)
    order by 1,4 `

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





