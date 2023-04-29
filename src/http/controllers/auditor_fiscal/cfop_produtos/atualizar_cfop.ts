import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { Cfop_Produtos_Update_Cfop } from '@/database/queries/cfop_produtos/cfop_update_cfop'

export async function cfop_update_cfop(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const bodySchema = z.object({
    cfopRef: z.any(),
    empresa: z.any(),
    estab: z.any(),
    ref: z.any(),
    pessoa: z.any(),
    cfop: z.any(),
  })

  const { cfopRef, empresa, estab, ref, pessoa, cfop } = bodySchema.parse(request.body)

  await Cfop_Produtos_Update_Cfop(cfopRef, empresa, estab, ref, pessoa, cfop)

  reply.send({
    message: 'ok',
    cfopRef: cfopRef,
    empresa: empresa,
    estab: estab,
    ref: ref,
    pessoa: pessoa,
    cfop: cfop,
  })
}
