import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { Query_CMI_Pis_Cofins_Debito } from '@/database/queries/cmi/pis_cofins/debito'

export async function cmi_pis_cofins_debito(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const bodySchema = z.object({
        data1: z.any(),
    })

    const { data1 } = bodySchema.parse(request.body)

    reply.send(await Query_CMI_Pis_Cofins_Debito(data1))
}
