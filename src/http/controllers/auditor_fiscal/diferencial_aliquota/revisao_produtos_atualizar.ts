import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function diferencaValorContabilRevisaoProdutosAtualizar(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const bodySchema = z.object({
    empresa: z.any(),
    produto: z.any(),
    aliquota: z.any(),
  })

  const { empresa, produto, aliquota } = bodySchema.parse(request.body)

  // Na Query ele faz duas operações e depois de cada operação retorna INSERT e/ou UPDATE

  return reply.status(200).send('INSERT/UPDATE')
}
