import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { Query_CMI_Simples_Debito } from '@/database/queries/cmi/simples_nacional/debito'

export async function cmi_simples_nacional_debito(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const bodySchema = z.object({
        data1: z.any(),
    })

    const { data1 } = bodySchema.parse(request.body)

    reply.send(await Query_CMI_Simples_Debito(data1))
}
