import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { Query_Listas_Empresas_Analista } from '@/database/queries/listas/empresas_analista'

export async function listas_empresas_analista(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const bodySchema = z.object({
        analista: z.any()
    })

    const { analista } = bodySchema.parse(request.body)

    return reply.status(200).send(
        await Query_Listas_Empresas_Analista(analista)
    )
}
