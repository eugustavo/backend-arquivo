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
        aliquota: z.any()
    })

    const { empresa, produto, aliquota } = bodySchema.parse(request.body)

    await Dif_Update_Aliq(empresa, produto, aliquota)

    reply.send({
        message: 'ok',
        empresa: empresa,
        produto: produto,
        aliquota: aliquota
    })
}
