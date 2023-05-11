import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { Query_Difal_Dif_Interna_Det } from '@/database/queries/difal/dif_interna'
import { Query_Listas_Empresas_Analista } from '@/database/queries/listas/empresas_analista'
import { Query_Listas_Empresas_Ativas } from '@/database/queries/listas/empresas_ativas'

export async function DifaInternaResumo(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const bodySchema = z.object({
        data1: z.any(),
        data2: z.any(),
        analista: z.any(),
        todos: z.any(),
    })

    function converteData(dataInformada: string): string {
        let data = dataInformada.split('/')
        return data[2] + '-' + data[1] + '-' + data[0]
    }

    const { analista, data1, data2, todos } = bodySchema.parse(request.body)

    let listaAnalista: any[] = []

    const empresasAnalista: any = await Query_Listas_Empresas_Analista(`'${analista}'`)

    for (let i = 0; i < empresasAnalista.length; i++) {

        let dados: any = await Query_Difal_Dif_Interna_Det(converteData(data1), converteData(data2), empresasAnalista[i].CODIGOEMPRESA, empresasAnalista[i].CODIGOESTAB)

        console.log(dados)

        if (dados) {
            listaAnalista.push({
                ...dados
            })
        }


    }

    let listaTodos: any[] = []

    if (todos) {

        const empresasAtivas: any = await Query_Listas_Empresas_Ativas()

        for (let i = 0; i < empresasAtivas.length; i++) {

            let dados: any = await Query_Difal_Dif_Interna_Det(converteData(data1), converteData(data2), empresasAtivas[i].CODIGOEMPRESA, empresasAtivas[i].CODIGOESTAB)

            let pendentes = 0
            let vinculados = 0
            let auditados = 0

            if (dados[i]) {

                let obj = {
                    CODIGOEMPRESA: dados[i]?.CODIGOEMPRESA,
                    CODIGOESTAB: dados[i]?.CODIGOESTAB,
                    NOMEESTAB: dados[i]?.NOMEESTAB,
                }
                dados.forEach((item: any) => {
                    if (item.CFOP_REL !== item.CODIGOCFOP) {
                        pendentes = pendentes + 1
                        console.log('Chegou no Pendentes: ', pendentes)
                    }
                    if (item.CFOP_REL == item.CODIGOCFOP && item.CSTIPI !== '49') {
                        vinculados = vinculados + 1
                        console.log('Chegou no Vinculados: ', vinculados)
                    }
                    if (item.CFOP_REL == item.CODIGOCFOP && item.CSTIPI == '49') {
                        auditados = auditados + 1
                        console.log('Chegou no Auditados: ', auditados)
                    }
                })

                listaTodos.push({
                    ...obj,
                    pendentes,
                    vinculados,
                    auditados
                })
            }

        }
    }



    return reply.status(200).send({
        eu: listaAnalista,
        todos: listaTodos
    })

}
