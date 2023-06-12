import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import {query_sinc_vencimentos_impostos } from '@/database/queries/sincronizacao/sinc_vencimentos_impostos'

export async function sinc_vencimentos_impostos(
    request: FastifyRequest,
    reply: FastifyReply,
) {

    reply.send(
       await query_sinc_vencimentos_impostos()
    )
}
