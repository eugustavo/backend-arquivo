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

  console.log(data1, data2, analista)

  Firebird.attach(options, function (err, db): any {
    if (err) {
      console.log('Erro no Attach: ', err)
    }

    db.query(
      empresasAnalista(data1, data2, analista), [],
      async function (err, result) {
        if (err) {
          console.log('Erro na Query');
          console.log('Erro na Query: ', err);
          reply.send({
            message: 'Erro',
            error: err,
          })
        } else {
          console.log('Sucesso na Query');
          console.log('Resultado: ', result);
          reply.send({
            message: 'Sucesso',
            data: result,
          })
        }
        db.detach();
      });
  });
  

}

  // const analistaAux = db.query(
  //   empresasAnalista(data1, data2, analista),
  //   ['utf8'],
  //   function (err: any, result: any) {
  //     if (err) throw err

  //     auxAnalista = result
  //     console.log('DENTRO DA FUNÇÃO ANALISTA: ', result)

  //     db.detach()
  //     return result
  //   },
  // )

  // const todosAux = db.query(
  //   empresasAnalistaAll(data1, data2),
  //   ['utf8'],
  //   function (err: any, result: any) {
  //     if (err) throw err

  //     auxTodos = result
  //     console.log('DENTRO DA FUNÇÃO TODOS: ', result)

  //     db.detach()
  //     return result
  //   },
  // )






