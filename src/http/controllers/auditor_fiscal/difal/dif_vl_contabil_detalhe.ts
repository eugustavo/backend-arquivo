import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { Query_Difal_Dif_Valor_Contabil_Detalhe } from '@/database/queries/difal/dif_valor_contabil_detalhe'

export async function difal_dif_valor_detalhe(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const bodySchema = z.object({
        data1: z.any(),
        data2: z.any(),
        empresa: z.any(),
        estab: z.any(),
    })

    function converteData(dataInformada: string): string {
        let data = dataInformada.split('/')
        return data[2] + '-' + data[1] + '-' + data[0]
    }

    const { data1, data2, empresa, estab } = bodySchema.parse(request.body)

    return reply.status(200).send(
        await Query_Difal_Dif_Valor_Contabil_Detalhe(converteData(data1), converteData(data2), empresa, estab)
    )
}
