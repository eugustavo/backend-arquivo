import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { Query_CMI_Pis_Cofins_Apuracao } from '@/database/queries/cmi/pis_cofins/apuracao'

export async function cmi_pis_cofins_apuracao(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const bodySchema = z.object({
        data1: z.any(),
    })

    const { data1 } = bodySchema.parse(request.body)

    reply.send(await Query_CMI_Pis_Cofins_Apuracao(data1))
}
