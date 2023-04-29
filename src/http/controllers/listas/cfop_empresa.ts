import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { Query_Listas_Cfop_Empresas } from '@/database/queries/listas/cfop_empresa'

export async function listas_cfop_empresa(
    request: FastifyRequest,
    reply: FastifyReply,
) {

    const bodySchema = z.object({
        empresa: z.any(),
        estab: z.any()
    })

    const { empresa, estab } = bodySchema.parse(request.body)

    return reply.status(200).send(
        await Query_Listas_Cfop_Empresas(empresa, estab)
    )
}
