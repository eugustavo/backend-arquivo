import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { Query_CMI_Icms_1449_Debito } from '@/database/queries/cmi/icms_1449/debito'

export async function cmi_icms_1449_debito(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const bodySchema = z.object({
        data1: z.any(),
    })

    const { data1 } = bodySchema.parse(request.body)

    reply.send(await Query_CMI_Icms_1449_Debito(data1))
}
