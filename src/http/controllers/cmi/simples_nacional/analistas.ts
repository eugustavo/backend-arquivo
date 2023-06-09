import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { Query_CMI_Simples_Analistas } from '@/database/queries/cmi/simples_nacional/analistas'

export async function cmi_simples_nacional_analistas(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    
    reply.send(await Query_CMI_Simples_Analistas())
}
