import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { Query_Difal_Ref_Forn_Todos } from '@/database/queries/difal/rev_forn_todos'

export async function difal_ref_forn_todos(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const bodySchema = z.object({
        data1: z.any(),
        data2: z.any()
    })

    const { data1, data2 } = bodySchema.parse(request.body)

    return reply.status(200).send(
        await Query_Difal_Ref_Forn_Todos(data1, data2)
    )
}
