import firebird from 'node-firebird'
import { options } from '../../../lib/firebird'

export function query_sinc_empresas() {


    const sql = `select
        a.codigoempresa,
        CASE
            WHEN a.NOMEFANTASIA = '********' THEN cast(A.nomeestab as varchar(160) character set win1252)
            ELSE cast(A.NOMEFANTASIA as varchar(160) character set win1252)
        END AS FANTASIA,
        cast(a.NOMEESTABCOMPLETO as varchar(160) character set win1252) AS RAZAO,
        a.INSCRFEDERAL AS CNPJ,
        a.CODIGOEMPRESA AS QUESTOR_EMPRESA,
        a.CODIGOESTAB AS QUESTOR_ESTABELECIMENTO,
        cast(b.DSTIPOLOGRADORO as varchar(60) character set win1252) AS TIPO,
        cast(a.ENDERECOESTAB as varchar(160) character set win1252) AS ENDERECO, 
        a.numenderestab AS NUMERO,
        cast(a.bairroenderestab as varchar(60) character set win1252) AS BAIRRO,
        cast(c.nomemunic as varchar(60) character set win1252)  as CIDADE,
        c.siglaestado as UF,
        A.DATAREGIST AS DATA_CAD
        from
        estab a
        left join tipologradoro b on (b.codigotipologradoro = a.codigotipolograd)
        left join municipio c on (
            c.codigomunic = a.codigomunic
            and c.SIGLAESTADO = a.siglaestado
        )
        where
        a.DATAENCERATIV = '31.12.2100'
        and a.codigoempresa not in (1000)
        and a.NOMEESTAB not like '%TESTE%'`

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
