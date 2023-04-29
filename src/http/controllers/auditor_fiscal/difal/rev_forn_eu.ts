import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { Query_Difal_Ref_Forn_Eu } from '@/database/queries/difal/rev_forn_eu'

export async function difal_ref_forn_eu(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const bodySchema = z.object({
        data1: z.any(),
        data2: z.any(),
        analista: z.any()
    })

    const { data1, data2, analista } = bodySchema.parse(request.body)

    return reply.status(200).send(
        await Query_Difal_Ref_Forn_Eu(data1, data2, analista)
    )
}
