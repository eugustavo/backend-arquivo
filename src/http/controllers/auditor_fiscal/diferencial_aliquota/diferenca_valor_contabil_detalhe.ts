import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function diferencaValorContabilDetalhe(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const bodySchema = z.object({
    data1: z.any(),
    data2: z.any(),
    empresa: z.any(),
    estab: z.any(),
  })

  const { data1, data2, empresa, estab } = bodySchema.parse(request.body)

  const value: Array<JSON> = [] // Retornar um Array da Query = Dm_Difal.sql_Diferenca_Valor_Contabil_Detalhe.toJSONArray()

  return reply.status(200).send(value)
}
