import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { query_nfs_motivo } from '@/database/queries/notas_nao_lancadas/nfs_motivo'

export async function nfs_informa_motivo(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const bodySchema = z.object({
    chave: z.any(),
    motivo: z.any(),
  })

  const { chave, motivo } = bodySchema.parse(request.body)

  await query_nfs_motivo(chave, motivo)

  reply.send({
    message: 'ok',
    motivo: motivo,
    chave: chave,
  })
}
