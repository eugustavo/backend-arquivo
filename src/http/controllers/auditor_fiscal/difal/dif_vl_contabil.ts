import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { Query_Difal_Dif_Valor_Contabil_Eu } from '@/database/queries/difal/dif_valor_contabil_eu'
import { Query_Difal_Dif_Valor_Contabil_Todos } from '@/database/queries/difal/dif_valor_contabil_todos'

export async function difal_dif_valor(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const bodySchema = z.object({
        data1: z.any(),
        data2: z.any(),
        analista: z.any()
    })

    function converteData(dataInformada: string): string {
        let data = dataInformada.split('/')
        return data[2] + '-' + data[1] + '-' + data[0]
    }

    const { data1, data2, analista } = bodySchema.parse(request.body)

    return reply.status(200).send({
        eu: await Query_Difal_Dif_Valor_Contabil_Eu(converteData(data1), converteData(data2), analista),
        todos: await Query_Difal_Dif_Valor_Contabil_Todos(converteData(data1), converteData(data2)),
    })
}
