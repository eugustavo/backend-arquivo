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

        if (dados.length > 0) {
            listaAnalista.push(dados)
        }


    }

    let listaTodos: any[] = []

    if (todos) {

        const empresasAtivas: any = await Query_Listas_Empresas_Ativas()

        for (let i = 0; i < empresasAtivas.length; i++) {
            

            let dados: any = await Query_Difal_Dif_Interna_Det(converteData(data1), converteData(data2), empresasAnalista[i].CODIGOEMPRESA, empresasAnalista[i].CODIGOESTAB)

            console.log(dados)

            if (dados.length > 0) {
                listaTodos.push(dados)
            }


        }
    }



    return reply.status(200).send({
        eu: listaAnalista,
        todos: listaTodos
    })

}
