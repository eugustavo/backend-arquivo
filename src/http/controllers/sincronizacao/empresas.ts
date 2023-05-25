import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { query_sinc_empresas } from '@/database/queries/sincronizacao/sinc_empresas'

export async function sinc_empresas(
    request: FastifyRequest,
    reply: FastifyReply,
) {

    reply.send(
       await query_sinc_empresas()
    )
}
