import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { Query_CMI_Simples_Empresas } from '@/database/queries/cmi/simples_nacional/empresas'

export async function cmi_simples_nacional_empresas(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const bodySchema = z.object({
        data1: z.any(),
    })

    const { data1 } = bodySchema.parse(request.body)

    reply.send(await Query_CMI_Simples_Empresas(data1))
}
