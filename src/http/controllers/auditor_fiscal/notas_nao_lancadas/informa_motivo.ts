import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function informaMotivo(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const bodySchema = z.object({
    chave: z.any(),
    motivo: z.any(),
  })

  const { chave, motivo } = bodySchema.parse(request.body)

  return reply.status(200).send('OK')
}
