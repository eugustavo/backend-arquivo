import axios from 'axios'
import moment from 'moment';
import { query_sinc_funcionarios } from '@/database/queries/sincronizacao/sinc_funcionarios'
import { query_sinc_empresas } from '@/database/queries/sincronizacao/sinc_empresas'
import { query_sinc_contas_ctb_bancos } from '@/database/queries/sincronizacao/sinc_contas_ctb_bancos'

import firebird from 'node-firebird'
import { options } from '../../../lib/firebird'

function ConverteDataBrToDate(data: any) {
    const mes = data.substring(3, 5)
    const dia = data.substring(0, 2)
    const ano = data.substring(6, 10)
    return ano + '-' + mes + '-' + dia
}

export async function job_sinc_funcionarios() {

    console.log('Iniciando Sincronização Agendada de Funcionários')

    const listaSincronizar: any = await query_sinc_funcionarios()

    console.log('Total de Funcionários para Sincronizar: ' + listaSincronizar.length)

    const tamanhoGrupo = 500
    for (let i = 0; i < listaSincronizar.length; i += tamanhoGrupo) {
        const grupo = listaSincronizar.slice(i, i + tamanhoGrupo)
        const funcionarios = grupo.map((funcionario: any) => {
            return {
                empresa: funcionario.CODIGOEMPRESA,
                estab: funcionario.CODIGOESTAB,
                contrato: funcionario.CODIGOFUNCCONTR,
                pessoa: funcionario.CODIGOFUNCPESSOA,
                cpf: funcionario.CPFFUNC,
                nome: funcionario.NOMEFUNC
            }
        })
        axios.post('https://api.aws.inf.br/connect/questor/funcionarios/incluir',
            funcionarios,
            {
                headers: {
                    contenType: 'application/json'
                }
            })
            .then(function (response) {
                if (response.status === 201) {
                    console.log('Funcionários Incluídos com Sucesso')
                } else {
                    console.log('Erro ao Incluir Funcionários')
                }
            })
            .catch(function (error) {
                console.log('Falha no Processo:', error)
            })
    }
}




// export async function job_sinc_empresas() {

//     console.log('Iniciando Sincronização Agendada de Empresas')

//     const listaSincronizar: any = await query_sinc_empresas()

//     console.log('Total de Empresas para Sincronizar: ' + listaSincronizar.length)

//     for (let i = 0; i < listaSincronizar.length; i++) {

//         axios.post('https://api.aws.inf.br/connect/questor/empresas/incluir',
//             {
//                 id: listaSincronizar[i].CODIGOEMPRESA,
//                 nome: listaSincronizar[i].FANTASIA,
//                 razao: listaSincronizar[i].RAZAO,
//                 cnpj: listaSincronizar[i].CNPJ,
//                 empresa: listaSincronizar[i].QUESTOR_EMPRESA,
//                 estabelecimento: listaSincronizar[i].QUESTOR_ESTABELECIMENTO,
//                 datacad: listaSincronizar[i].DATA_CAD,
//                 endereco: listaSincronizar[i].TIPO + ' ' + listaSincronizar[i].ENDERECO,
//                 numero: listaSincronizar[i].NUMERO,
//                 bairro: listaSincronizar[i].BAIRRO,
//                 cidade: listaSincronizar[i].CIDADE,
//                 uf: listaSincronizar[i].UF
//             },
//             {
//                 headers: {
//                     contenType: 'application/json'
//                 }
//             })

//             .then(function (response) {

//                 if (response.status === 201) {

//                     console.log('Empresa Incluída com Sucesso')

//                 } else {
//                     console.log('Erro ao Incluir Empresa')
//                 }

//             })
//             .catch(function (error) {
//                 console.log('Falha no Processo:', error)

//             })

//     }

// }

export async function job_sinc_empresas() {

    console.log('Iniciando Sincronização Agendada de Empresas')

    const listaSincronizar: any = await query_sinc_empresas()

    console.log('Total de Empresas para Sincronizar: ' + listaSincronizar.length)

    const tamanhoGrupo = 500
    for (let i = 0; i < listaSincronizar.length; i += tamanhoGrupo) {
        const grupo = listaSincronizar.slice(i, i + tamanhoGrupo)
        const empresas = grupo.map((empresa: any) => {
            return {
                id: empresa.CODIGOEMPRESA,
                nome: empresa.FANTASIA,
                razao: empresa.RAZAO,
                cnpj: empresa.CNPJ,
                empresa: empresa.QUESTOR_EMPRESA,
                estabelecimento: empresa.QUESTOR_ESTABELECIMENTO,
                datacad: empresa.DATA_CAD,
                endereco: empresa.TIPO + ' ' + empresa.ENDERECO,
                numero: empresa.NUMERO,
                bairro: empresa.BAIRRO,
                cidade: empresa.CIDADE,
                uf: empresa.UF
            }
        })
        axios.post('https://api.aws.inf.br/connect/questor/empresas/incluir',
            empresas,
            {
                headers: {
                    contenType: 'application/json'
                }
            })
            .then(function (response) {
                if (response.status === 201) {
                    console.log('Empresas Incluídas com Sucesso')
                } else {
                    console.log('Erro ao Incluir Empresas')
                }
            })
            .catch(function (error) {
                console.log('Falha no Processo:', error)
            })
    }
}

export async function job_sinc_contas_banco_ctb() {

    console.log('Iniciando Sincronização Agendada de Contas Contabéis Bancárias')

    const listaSincronizar: any = await query_sinc_contas_ctb_bancos()

    console.log('Total de Contas para Sincronizar: ' + listaSincronizar.length)

    const tamanhoGrupo = 500
    for (let i = 0; i < listaSincronizar.length; i += tamanhoGrupo) {
        const grupo = listaSincronizar.slice(i, i + tamanhoGrupo)
        const contas = grupo.map((conta: any) => {
            return {
                empresa: conta.CODIGOEMPRESA,
                estab: conta.CODIGOESTAB,
                conta: conta.CONTACTB,
                descricao: conta.DESCRCONTA,
            }
        })
        axios.post('https://api.aws.inf.br/connect/questor/contas_bancos_ctb/incluir',
            contas,
            {
                headers: {
                    contenType: 'application/json'
                }
            })
            .then(function (response) {
                if (response.status === 201) {
                    console.log('Contas Incluídas com Sucesso')
                } else {
                    console.log('Erro ao Incluir Contas')
                }
            })
            .catch(function (error) {
                console.log('Falha no Processo:', error)
            })
    }

    // console.log('Iniciando Sincronização Agendada de Contas Contábeis Bancárias')

    // const listaSincronizar: any = await query_sinc_contas_ctb_bancos()

    // console.log('Total de Contas Contábeis Bancárias para Sincronizar: ' + listaSincronizar.length)

    // for (let i = 0; i < listaSincronizar.length; i++) {

    //     axios.post('https://api.aws.inf.br/connect/questor/contas_bancos_ctb/incluir',
    //         {
    //             empresa: listaSincronizar[i].CODIGOEMPRESA,
    //             estab: listaSincronizar[i].CODIGOESTAB,
    //             conta: listaSincronizar[i].CONTACTB,
    //             descricao: listaSincronizar[i].DESCRCONTA,
    //         },
    //         {
    //             headers: {
    //                 contenType: 'application/json'
    //             }
    //         })

    //         .then(function (response) {

    //             if (response.status === 201) {

    //                 console.log('Conta Contábel Bancária Incluída com Sucesso')

    //             } else {
    //                 console.log('Erro ao Incluir Conta Contábel Bancária')
    //             }

    //         })
    //         .catch(function (error) {
    //             console.log('Falha no Processo:', error)

    //         })

    // }

}
export async function job_sat_grava_questor() {

    console.log('Iniciando Sincronização SAT AWS QUESTOR')

    axios.post('https://api.aws.inf.br/connect/sat/listar',
        {
            tabela: 'sat_dfe_consulta_nfe',
            p1: '2023-07-01',
            p2: '2023-07-31'
        },
        {
            headers: {
                contenType: 'application/json'
            }
        })
        .then(function (response) {
            if (response.status == 200) {

                // for (let i = 0; i < response.data.length; i++) {
                for (let i = 0; i < 2; i++) {

                    // console.log(response.data[i])
                    const numeronf = response.data[i].numerodocumento
                    const serienf = response.data[i].seriedocumento
                    const dataemissao = ConverteDataBrToDate(response.data[i].dataemissao)
                    const valorTotalNota = response.data[i].valortotalnota.replace(',', '.')
                    const ipi = response.data[i].ipi
                    const valortotalicms = response.data[i].valortotalicms.replace(',', '.')
                    const totalicmsst = response.data[i].totalicmsst.replace(',', '.')
                    const ieemitente = response.data[i].ieemitente
                    const chaveacessoformatado = response.data[i].chaveacessoformatado

                    const operacao = response.data[i].operacao == 'S' ? '1' : '0'
                    const situacao = response.data[i].situacao == 'Autorizada' ? '0' : '2'


                    const sql = `INSERT INTO LCTOFISSAI
                            (CODIGOEMPRESA, CHAVELCTOFISSAI, CODIGOESTAB, CODIGOPESSOA, NUMERONF, NUMERONFFINAL, ESPECIENF, SERIENF, DATALCTOFIS
                            , VALORCONTABIL, BASECALCULOIPI, VALORIPI, ISENTASIPI, OUTRASIPI, CONTRIBUINTE, COMPLHIST
                            , CODIGOTIPODCTOSINTEGRA, CDMODELO, CHAVENFESAI, EMITENTENF, FINALIDADEOPERACAO, INDPAGTO
                            , MEIOPAGAMENTO, CDSITUACAO, CODIGOUSUARIO, DATAHORALCTOFIS, ORIGEMDADO, ACRESCIMOFINANCEIRO, CONCILIADA, CANCELADA )
                            VALUES ('9999', null, '1', '1', '${numeronf}', '${numeronf}', 'NFE', '${serienf}', '${dataemissao}', '${valorTotalNota}',
                            '${ipi}', '${valortotalicms}','${totalicmsst}','0','${operacao}','${ieemitente}','55','55','${chaveacessoformatado}','P','0','0','1',
                            '${situacao}','2420','${moment().format('YYYY-MM-DD HH:mm:ss')}', '3' 0,0,0)
                       `

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







            } else {

                console.log('Erro ao Baixar SAT')

            }
        })
        .catch(function (error) {
            console.log('Falha no Processo:', error)
        })


}
