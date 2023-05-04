import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { Query_Difal_Difa_Antecipacao } from '@/database/queries/difal/difa_antecipacao'

export async function difal_difa_antecipacao(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const bodySchema = z.object({
        data1: z.any(),
        data2: z.any()
    })

    function converteData(dataInformada: string): string {
        let data = dataInformada.split('/')
        return data[2] + '-' + data[1] + '-' + data[0]
    }

    const { data1, data2 } = bodySchema.parse(request.body)

    return reply.status(200).send(
        await Query_Difal_Difa_Antecipacao(converteData(data1), converteData(data2))
    )
}
