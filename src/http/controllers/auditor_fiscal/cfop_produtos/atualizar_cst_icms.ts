import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { Cfop_Produtos_Update_Icms } from '@/database/queries/cfop_produtos/cfop_update_icms'

export async function cfop_update_icms(
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

  await Cfop_Produtos_Update_Icms(cst, empresa, estab, ref, pessoa, cfop)

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
