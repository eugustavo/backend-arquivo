import axios from 'axios'

import { query_sinc_funcionarios } from '@/database/queries/sincronizacao/sinc_funcionarios'
import { query_sinc_empresas } from '@/database/queries/sincronizacao/sinc_empresas'
import { query_sinc_contas_ctb_bancos } from '@/database/queries/sincronizacao/sinc_contas_ctb_bancos'

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




export async function job_sinc_empresas() {

    console.log('Iniciando Sincronização Agendada de Empresas')

    const listaSincronizar: any = await query_sinc_empresas()

    console.log('Total de Empresas para Sincronizar: ' + listaSincronizar.length)

    for (let i = 0; i < listaSincronizar.length; i++) {

        axios.post('https://api.aws.inf.br/connect/questor/empresas/incluir',
            {
                id: listaSincronizar[i].CODIGOEMPRESA,
                nome: listaSincronizar[i].FANTASIA,
                razao: listaSincronizar[i].RAZAO,
                cnpj: listaSincronizar[i].CNPJ,
                empresa: listaSincronizar[i].QUESTOR_EMPRESA,
                estabelecimento: listaSincronizar[i].QUESTOR_ESTABELECIMENTO,
                datacad: listaSincronizar[i].DATA_CAD,
                endereco: listaSincronizar[i].TIPO + ' ' + listaSincronizar[i].ENDERECO,
                numero: listaSincronizar[i].NUMERO,
                bairro: listaSincronizar[i].BAIRRO,
                cidade: listaSincronizar[i].CIDADE,
                uf: listaSincronizar[i].UF
            },
            {
                headers: {
                    contenType: 'application/json'
                }
            })

            .then(function (response) {

                if (response.status === 201) {

                    console.log('Empresa Incluída com Sucesso')

                } else {
                    console.log('Erro ao Incluir Empresa')
                }

            })
            .catch(function (error) {
                console.log('Falha no Processo:', error)

            })

    }

}
export async function job_sinc_contas_banco_ctb() {

    console.log('Iniciando Sincronização Agendada de Contas Contábeis Bancárias')

    const listaSincronizar: any = await query_sinc_contas_ctb_bancos()

    console.log('Total de Contas Contábeis Bancárias para Sincronizar: ' + listaSincronizar.length)

    for (let i = 0; i < listaSincronizar.length; i++) {

        axios.post('https://api.aws.inf.br/connect/questor/contas_bancos_ctb/incluir',
            {
                empresa: listaSincronizar[i].CODIGOEMPRESA,
                estab: listaSincronizar[i].CODIGOESTAB,
                conta: listaSincronizar[i].CONTACTB,
                descricao: listaSincronizar[i].DESCRCONTA,
            },
            {
                headers: {
                    contenType: 'application/json'
                }
            })

            .then(function (response) {

                if (response.status === 201) {

                    console.log('Conta Contábel Bancária Incluída com Sucesso')

                } else {
                    console.log('Erro ao Incluir Conta Contábel Bancária')
                }

            })
            .catch(function (error) {
                console.log('Falha no Processo:', error)

            })

    }

}
