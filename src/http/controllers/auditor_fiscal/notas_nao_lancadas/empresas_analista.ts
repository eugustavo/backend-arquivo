import { FastifyReply, FastifyRequest } from 'fastify'
import Firebird from 'node-firebird'
import { options } from '@/lib/firebird'

import { empresasAnalista } from '@/database/queries/empresas_analista'
import { z } from 'zod'
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

  // const analistaJson: any = {}
  // let I: number

  const { data1, data2, analista } = bodySchema.parse(request.body)

  Firebird.attach(options, function (err, db) {
    if (err) throw err

    db.query(
      empresasAnalista(data1, data2, analista),
      [],
      function (err: any, result: any) {
        if (err) throw err

        console.log('ANALISTA: ', result)

        db.detach()
      },
    )

    db.query(
      empresasAnalistaAll(data1, data2),
      [],
      function (err: any, result: any) {
        if (err) throw err

        console.log('TODOS RESULTADOS: ', result)

        db.detach()
      },
    )
  })

  return reply.status(200).send()
}
