import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function notasNaoLancadas(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const bodySchema = z.object({
    data1: z.any(),
    data2: z.any(),
    empresa: z.any(),
    estab: z.any(),
  })

  const { empresa, estab, data1, data2 } = bodySchema.parse(request.body)

  return reply.status(200).send({
    notas_55: '',
    notas_57: '',
  })
}
