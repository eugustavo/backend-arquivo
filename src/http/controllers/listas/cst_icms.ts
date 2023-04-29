import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { Query_Listas_Cst_Icms } from '@/database/queries/listas/cst_icms'

export async function listas_cst_icms(
    request: FastifyRequest,
    reply: FastifyReply,
) {

    return reply.status(200).send(
        await Query_Listas_Cst_Icms()
    )
}
