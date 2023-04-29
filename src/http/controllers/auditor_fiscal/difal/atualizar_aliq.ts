import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { Dif_Update_Aliq } from '@/database/queries/difal/atualizar_aliq'

export async function difal_update_aliq(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const bodySchema = z.object({
        empresa: z.any(),
        produto: z.any(),
        aliq: z.any()
    })

    const { empresa, produto, aliq } = bodySchema.parse(request.body)

    await Dif_Update_Aliq(empresa, produto, aliq)

    reply.send({
        message: 'ok',
        empresa: empresa,
        produto: produto,
        aliq: aliq
    })
}
