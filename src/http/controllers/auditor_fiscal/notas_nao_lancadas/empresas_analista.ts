import { FastifyReply, FastifyRequest } from 'fastify'
import Firebird from 'node-firebird'
import { options } from '@/lib/firebird'

import { empresasAnalista } from '@/database/queries/empresas_analista'
import { z } from 'zod'
import { empresasAnalistaAll } from '@/database/queries/empresas_analista_all'

export function empresaAnalista(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const bodySchema = z.object({
    data1: z.any(),
    data2: z.any(),
    analista: z.any(),
  })

  let auxAnalista: any[] = []
  let auxTodos: any[] = []

  const { data1, data2, analista } = bodySchema.parse(request.body)

  Firebird.attach(options, async function (err, db): Promise<any> {
    if (err) throw err

    const analistaAux = db.query(
      empresasAnalista(data1, data2, analista),
      ['utf8'],
      async function (err: any, result: any) {
        if (err) throw err

        console.log(result)

        auxAnalista = result
        console.log('DENTRO DA FUNÇÃO ANALISTA: ', result)

        db.detach()
        return result
      },
    )

    const todosAux = db.query(
      empresasAnalistaAll(data1, data2),
      ['utf8'],
      async function (err: any, result: any) {
        if (err) throw err

        console.log(result)

        auxTodos = result
        console.log('DENTRO DA FUNÇÃO TODOS: ', result)

        db.detach()
        return result
      },
    )

    console.log('RETORNOS DAS FUNÇÕES: ', { analistaAux, todosAux })
  })

  return reply.status(200).send({
    analista: auxAnalista,
    todos: auxTodos,
    sqlAnalista: empresasAnalista(data1, data2, analista),
    sqlTodos: empresasAnalistaAll(data1, data2),
  })
}
