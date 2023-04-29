import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { Query_Difal_Ref_Prod_Eu } from '@/database/queries/difal/rev_prod_eu'

export async function difal_ref_prod_eu(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const bodySchema = z.object({
        data1: z.any(),
        data2: z.any(),
        analista: z.any(),
    })

    const { data1, data2, analista } = bodySchema.parse(request.body)

    return reply.status(200).send(
        await Query_Difal_Ref_Prod_Eu(data1, data2, analista)
    )
}
