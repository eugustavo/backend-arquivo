import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { query_nfs_analista } from '@/database/queries/notas_nao_lancadas/nfs_analista'
import { query_nfs_empresas } from '@/database/queries/notas_nao_lancadas/nfs_empresas'

export async function nfs_indice(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const bodySchema = z.object({
    data1: z.any(),
    data2: z.any(),
    analista: z.any(),
  })

  const { data1, data2, analista } = bodySchema.parse(request.body)

  reply.send({
    eu: await query_nfs_analista(data1, data2, analista),
    todos: await query_nfs_empresas(data1, data2),
  })
}
