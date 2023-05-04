import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { query_sinc_operadores } from '@/database/queries/sincronizacao/sinc_operadores'

export async function sinc_operadores(
    request: FastifyRequest,
    reply: FastifyReply,
) {

    reply.send(
       await query_sinc_operadores()
    )
}
