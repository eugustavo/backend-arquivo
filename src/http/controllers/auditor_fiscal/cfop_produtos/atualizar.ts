import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function atualizar(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    cfopRef: z.any(),
    cstIPI: z.any(),
    cstICMS: z.any(),
  })

  const { cfopRef, cstIPI, cstICMS } = bodySchema.parse(request.body)

  return reply.status(200).send('OK')
}
