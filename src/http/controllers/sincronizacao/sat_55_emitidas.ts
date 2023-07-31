import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { query_sat_55_emitidas } from '@/database/queries/sincronizacao/sinc_sat_55_emitidas'

export async function sat_55_emitidas(
    request: FastifyRequest,
    reply: FastifyReply,
) {

    reply.send(
        await query_sat_55_emitidas()
    )
}
