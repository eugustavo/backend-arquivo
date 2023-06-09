import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { Query_CMI_Simples_Apuracao } from '@/database/queries/cmi/simples_nacional/apuracao'

export async function cmi_simples_nacional_apuracao(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const bodySchema = z.object({
        data1: z.any(),
    })

    const { data1 } = bodySchema.parse(request.body)

    reply.send(await Query_CMI_Simples_Apuracao(data1))
}
