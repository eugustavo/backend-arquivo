import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { query_sinc_contas_ctb_bancos } from '@/database/queries/sincronizacao/sinc_contas_ctb_bancos'

export async function sinc_contas_ctb_bancos(
    request: FastifyRequest,
    reply: FastifyReply,
) {

    reply.send(
       await query_sinc_contas_ctb_bancos()
    )
}
