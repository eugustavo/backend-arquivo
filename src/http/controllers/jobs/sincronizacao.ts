import axios from 'axios'

import { query_sinc_funcionarios } from '@/database/queries/sincronizacao/sinc_funcionarios'

export async function job_sinc_funcionarios() {

    console.log('Iniciando Sincronização Agendada de Funcionários')

    const listaSincronizar: any = await query_sinc_funcionarios()

    console.log('Total de Funcionários para Sincronizar: ' + listaSincronizar.length)

    for (let i = 0; i < listaSincronizar.length; i++) {

        axios.post('https://api.aws.inf.br/connect/questor/funcionarios/incluir',
            {
                empresa: listaSincronizar[i].CODIGOEMPRESA,
                estab: listaSincronizar[i].CODIGOESTAB,
                contrato: listaSincronizar[i].CODIGOFUNCCONTR,
                pessoa: listaSincronizar[i].CODIGOFUNCPESSOA,
                cpf: listaSincronizar[i].CPFFUNC,
                nome: listaSincronizar[i].NOMEFUNC
            },
            {
                headers: {
                    contenType: 'application/json'
                }
            })

            .then(function (response) {

                if (response.status === 201) {

                    console.log('Funcionário Incluído com Sucesso')

                } else {
                    console.log('Erro ao Incluir Funcionário')
                }

            })
            .catch(function (error) {
                console.log('Falha no Processo:', error)

            })

    }

}
