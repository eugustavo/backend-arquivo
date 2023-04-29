import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { Cfop_Produtos_Update_Ipi } from '@/database/queries/cfop_produtos/cfop_update_ipi'

export async function cfop_update_ipi(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const bodySchema = z.object({
    cst: z.any(),
    empresa: z.any(),
    estab: z.any(),
    ref: z.any(),
    pessoa: z.any(),
    cfop: z.any(),
  })

  const { cst, empresa, estab, ref, pessoa, cfop } = bodySchema.parse(request.body)

  await Cfop_Produtos_Update_Ipi(cst, empresa, estab, ref, pessoa, cfop)

  reply.send({
    message: 'ok',
    cst: cst,
    empresa: empresa,
    estab: estab,
    ref: ref,
    pessoa: pessoa,
    cfop: cfop,
  })
}
