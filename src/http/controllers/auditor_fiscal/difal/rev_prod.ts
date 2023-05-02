import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { Query_Difal_Ref_Prod_Eu } from '@/database/queries/difal/rev_prod_eu'
import { Query_Difal_Ref_Prod_Todos } from '@/database/queries/difal/rev_prod_todos'

export async function difal_ref_prod(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const bodySchema = z.object({
        data1: z.any(),
        data2: z.any(),
        analista: z.any(),
    })

    function converteData(dataInformada: string): string {
        let data = dataInformada.split('/')
        return data[2] + '-' + data[1] + '-' + data[0]
    }

    const { data1, data2, analista } = bodySchema.parse(request.body)

    return reply.status(200).send({
        eu: await Query_Difal_Ref_Prod_Eu(converteData(data1), converteData(data2), analista),
        todos: await Query_Difal_Ref_Prod_Todos(converteData(data1), converteData(data2)),
    }
        
    )
}
