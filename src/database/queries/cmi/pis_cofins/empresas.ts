import firebird from 'node-firebird'
import { options } from '../../../../lib/firebird'

export function Query_CMI_Pis_Cofins_Empresas(data1: any) {

    const sql = `select
        b.CODIGOEMPRESA,
        b.CODIGOESTAB,
        b.INSCRFEDERAL,
        b.NOMEESTAB,
        b.CODIGOEMPRESA||'|'|| b.CODIGOESTAB,
        a.DATAEFD ultima_opcao
        from estab b left join 
        OPCAOEFD  a on (b.CODIGOEMPRESA = a.CODIGOEMPRESA),
        (select 
        CODIGOEMPRESA ,
        max (DATAEFD)DATAEFD 
        from OPCAOEFD 
        WHERE DATAEFD  <=  '${data1}'
        group by 1
        order by 1) sel ,  
        (select 
        CODIGOEMPRESA,
        CODIGOESTAB from estab where INSCRFEDERAL like '%/0001%' or INSCRFEDERAL 
        in ('28.176.922/0002-54','00.070.112/0008-95') OR INSCRICAOSCP IS NOT NULL) sel_2
        where 
        a.CODIGOEMPRESA = sel.CODIGOEMPRESA and 
        a.DATAEFD  = sel.DATAEFD  and 
        a.APURAEFD  = 1 and
        b.DATAENCERATIV > '${data1}'
        and b.codigoempresa = sel_2.codigoempresa
        and b.CODIGOESTAB = sel_2.CODIGOESTAB`


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
