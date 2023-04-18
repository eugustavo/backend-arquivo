import { FastifyReply, FastifyRequest } from 'fastify'
import firebird from 'node-firebird'
import { options } from '@/lib/firebird'

import { EmpresasAnalista } from '@/database/queries/empresas_analista'
import { any, z } from 'zod'
import { empresasAnalistaAll } from '@/database/queries/empresas_analista_all'

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
    analista: await EmpresasAnalista(data1, data2, analista)
  })

}