import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { Dif_Difa_Inserir } from '@/database/queries/difal/difa_antecipacao_inserir'

export async function difal_difa_inserir(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const bodySchema = z.object({
        empresa: z.any(),
        estab: z.any(),
        chave: z.any(),
        seq: z.any(),
        data: z.any(),
        produto: z.any(),
        aliquota: z.any(),
        cfop: z.any(),
        bc_calc: z.any(),
        vl_calc: z.any()
    })

    const { empresa, estab, chave, seq, data, produto, aliquota, cfop, bc_calc, vl_calc } = bodySchema.parse(request.body)

    await Dif_Difa_Inserir(empresa, estab, chave, seq, data, produto, aliquota, cfop, bc_calc, vl_calc)

    reply.send({
        message: 'ok'
    })
}
