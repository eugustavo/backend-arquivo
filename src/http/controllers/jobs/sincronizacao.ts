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
            tabela: 'sat_dfe_consulta_nfe'
        },
        {
            headers: {
                contenType: 'application/json'
            }
        })
        .then(async function (response) {
            if (response.status == 200) {

                for (let i = 0; i < response.data.length; i++) {
                    // for (let i = 0; i < 2; i++) {

                    try {

                        console.log('Iniciando Sincronização SAT AWS QUESTOR Chave: ' + response.data[i].chaveacessoformatado)
                        console.log(response.data[i])

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

                        const recordExists: boolean = await checkIfRecordExists(chaveacessoformatado);

                        if (recordExists) {

                            await updateSituacao(chaveacessoformatado, situacao);
                            console.log(`Registro com chave ${chaveacessoformatado} já existe. Situação atualizada.`);

                        } else {

                            const sql = `INSERT INTO LCTOFISSAI
                            (CODIGOEMPRESA, CHAVELCTOFISSAI, CODIGOESTAB, CODIGOPESSOA, NUMERONF, NUMERONFFINAL, ESPECIENF, SERIENF, DATALCTOFIS
                            , VALORCONTABIL, BASECALCULOIPI, VALORIPI, ISENTASIPI, OUTRASIPI, CONTRIBUINTE, COMPLHIST
                            , CODIGOTIPODCTOSINTEGRA, CDMODELO, CHAVENFESAI, EMITENTENF, FINALIDADEOPERACAO, INDPAGTO
                            , MEIOPAGAMENTO, CDSITUACAO, CODIGOUSUARIO, DATAHORALCTOFIS, ORIGEMDADO, ACRESCIMOFINANCEIRO, CONCILIADA, CANCELADA )
                            VALUES ('9999', null, '1', '1', '${numeronf}', '${numeronf}', 'NFE', '${serienf}', '${dataemissao}', '${valorTotalNota}',
                            '${ipi}', '${valortotalicms}','${totalicmsst}','0','${operacao}','${ieemitente}','55','55','${chaveacessoformatado}','P','0','0','1',
                            '${situacao}','2420','${moment().format('YYYY-MM-DD HH:mm:ss')}', '3', 0,0,0)
                            `

                            const insertSuccess: boolean = await executeQuery(sql);
                            if (insertSuccess) {
                                axios.post('https://api.aws.inf.br/connect/sat/questor',
                                    {
                                        chaveacessoformatado: chaveacessoformatado
                                    },
                                    {
                                        headers: {
                                            contenType: 'application/json'
                                        }
                                    })
                                    .then(function (response) {
                                        console.log(response.data)
                                    })
                                    .catch(function (error) {
                                        console.log('Falha no Processo:', error)
                                    })

                                console.log(`Novo registro inserido com chave ${chaveacessoformatado}.`);
                            } else {
                                console.log(`Erro ao inserir novo registro com chave ${chaveacessoformatado}.`);
                            }
                        }

                    } catch (error) {
                        console.log('Erro ao Inserir SAT: ', error)
                    }
                }
            } else {
                console.log('Erro ao Baixar SAT')
            }
        })
        .catch(function (error) {
            console.log('Falha no Processo:', error)
        })


}

async function checkIfRecordExists(chaveacessoformatado: string): Promise<boolean> {
    const query: string = `SELECT COUNT(*) AS recordCount FROM LCTOFISSAI WHERE CHAVENFESAI = '${chaveacessoformatado}' AND CODIGOEMPRESA = '9999'`;

    try {
        const result: any[] = await executeQueryWithResult(query);
        return result[0].recordCount > 0; // Corrected property name
    } catch (error) {
        console.error('Erro ao verificar existência do registro: ', error);
        return false; // An error occurred, treat as if record doesn't exist
    }
}



async function updateSituacao(chaveacessoformatado: string, situacao: string): Promise<void> {
    const updateQuery: string = `UPDATE LCTOFISSAI SET CDSITUACAO = '${situacao}' WHERE CHAVENFESAI = '${chaveacessoformatado}'  AND CODIGOEMPRESA = '9999'`;

    await executeQuery(updateQuery);
}

async function executeQuery(query: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        firebird.attach(options, function (err: any, db: any) {
            if (err) {
                console.error('Erro na Conexão: ', err);
                reject(err);
                return;
            }
            db.query(query, function (err: any, result: any[]) {
                if (err) {
                    console.error('Erro na Query: ', err);
                    reject(err);
                } else {
                    resolve(true); // Query executed successfully
                }
                db.detach();
            });
        });
    });
}
async function executeQueryWithResult(query: string): Promise<any[]> {
    return new Promise<any[]>((resolve, reject) => {
        firebird.attach(options, function (err: any, db: any) {
            if (err) {
                console.error('Erro na Conexão: ', err);
                reject(err);
                return;
            }
            db.query(query, function (err: any, result: any[]) {
                if (err) {
                    console.error('Erro na Query: ', err);
                    reject(err);
                } else {
                    resolve(result);
                }
                db.detach();
            });
        });
    });
}
