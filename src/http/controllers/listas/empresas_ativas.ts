import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { Query_Listas_Empresas_Ativas } from '@/database/queries/listas/empresas_ativas'

export async function listas_empresas_ativas(
    request: FastifyRequest,
    reply: FastifyReply,
) {

    return reply.status(200).send(
        await Query_Listas_Empresas_Ativas()
    )
}
