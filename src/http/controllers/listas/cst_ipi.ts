import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { Query_Listas_Cst_Ipi } from '@/database/queries/listas/cst_ipi'

export async function listas_cst_ipi(
    request: FastifyRequest,
    reply: FastifyReply,
) {

    return reply.status(200).send(
        await Query_Listas_Cst_Ipi()
    )
}
