import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { Query_Difal_Get_Aliq } from '@/database/queries/difal/get_aliq'

export async function difal_get_aliq(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const bodySchema = z.object({
        empresa: z.any(),
        produto: z.any()
    })

    const { empresa, produto } = bodySchema.parse(request.body)

    return reply.status(200).send(
        await Query_Difal_Get_Aliq(empresa, produto)
    )
}
