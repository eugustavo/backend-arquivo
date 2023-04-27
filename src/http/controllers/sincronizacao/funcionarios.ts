import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { query_sinc_funcionarios } from '@/database/queries/sincronizacao/sinc_funcionarios'

export async function sinc_funcionarios(
    request: FastifyRequest,
    reply: FastifyReply,
) {

    reply.send(
       await query_sinc_funcionarios()
    )
}
