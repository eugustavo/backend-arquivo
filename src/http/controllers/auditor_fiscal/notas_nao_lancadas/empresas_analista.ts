import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { EmpresasAnalista } from '@/database/queries/empresas_analista'
import { EmpresasAnalistaAll } from '@/database/queries/empresas_analista_all'

export async function empresaAnalista(
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
    eu: await EmpresasAnalista(data1, data2, analista),
    todos: await EmpresasAnalistaAll(data1, data2),
  })
}
