import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { Query_Difal_Dif_Valor_Contabil_Todos } from '@/database/queries/difal/dif_valor_contabil_todos'

export async function difal_dif_valor_todos(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const bodySchema = z.object({
        data1: z.any(),
        data2: z.any()
    })

    const { data1, data2 } = bodySchema.parse(request.body)

    return reply.status(200).send(
        await Query_Difal_Dif_Valor_Contabil_Todos(data1, data2)
    )
}
