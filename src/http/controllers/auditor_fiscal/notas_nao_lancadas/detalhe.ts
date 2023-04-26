import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { query_nfs_mod_55 } from '@/database/queries/notas_nao_lancadas/nfs_mod_55'
import { query_nfs_mod_57 } from '@/database/queries/notas_nao_lancadas/nfs_mod_57'

export async function nfs_detalhe(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const bodySchema = z.object({
    data1: z.any(),
    data2: z.any(),
    empresa: z.any(),
    estab: z.any(),
  })

  const { data1, data2, empresa, estab } = bodySchema.parse(request.body)

  reply.send({
    notas_55: await query_nfs_mod_55(empresa, estab, data1, data2),
    notas_57: await query_nfs_mod_57(empresa, estab, data1, data2),
  })
}
