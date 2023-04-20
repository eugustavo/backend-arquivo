import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function detalhe(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    data1: z.any(),
    data2: z.any(),
    empresa: z.any(),
    estab: z.any(),
  })

  const { data1, data2, empresa, estab } = bodySchema.parse(request.body)

  return reply.status(200).send({
    empresa: '',
    detalhe: '',
    cfop: '',
    cst_icms: '',
    cst_ipi: '',
  })
}
