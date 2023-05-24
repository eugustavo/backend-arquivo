import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { query_extrato_insert } from '@/database/queries/lancamentos_bancarios/integrar_extrato'

export async function extrato_insert(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const bodySchema = z.object({
        empresa: z.any(),
        estab: z.any(),
        conta: z.any(),
        data: z.any(),
        seq: z.any(),
        numero: z.any(),
        tipo: z.any(),
        valor: z.any(),
        descricao: z.any(),

    })

    const { empresa, estab, conta, data, seq, numero, tipo, valor, descricao } = bodySchema.parse(request.body)

    await query_extrato_insert(empresa, estab, conta, data, seq, numero, tipo, valor, descricao)

    reply.send({
        message: 'ok'
    })
}
