import firebird from 'node-firebird'
import { options } from '../../../../lib/firebird'

export function Query_CMI_Icms_1449_Empresas(data1: any) {

    const sql = `select
        b.CODIGOEMPRESA,
        b.CODIGOESTAB,
        b.INSCRFEDERAL,
        b.NOMEESTAB,
        b.CODIGOEMPRESA||'|'|| b.CODIGOESTAB,
        a.DATAICMSSC ultima_opcao,
        a.VARIACAOIMPOSTOICMS
        from estab b left join 
        OPCAOICMSSC    a on (b.CODIGOEMPRESA = a.CODIGOEMPRESA and a.CODIGOESTAB = b.CODIGOESTAB),
        (select 
        CODIGOEMPRESA ,
        codigoestab,
        max (DATAICMSSC)DATAEFD 
        from OPCAOICMSSC
        WHERE DATAICMSSC  <=  '${data1}'
        group by 1,2
        order by 1,2) sel 
        where 
        a.CODIGOEMPRESA = sel.CODIGOEMPRESA and
        a.CODIGOESTAB = sel.CODIGOESTAB and  
        a.DATAICMSSC  = sel.DATAEFD  and 
        a.APURAICMSSC  = 1 and
        b.DATAENCERATIV > '${data1}'
        and a.CODIGOIMPOSTOICMS = 1449`


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
