import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function cfopProdutos(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const bodySchema = z.object({
    data1: z.any(),
    data2: z.any(),
    empresa: z.any(),
    estab: z.any(),
  })

  const { data1, data2, analista, todos } = bodySchema.parse(request.body)

  return reply.status(200).send({
    eu: '',
    todos: '',
  })
}
