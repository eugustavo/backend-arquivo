import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { CfopProdutosDetalhe } from '@/database/queries/cfop_produtos/cfop_detalhe'
import { Query_Listas_Empresas_Analista } from '@/database/queries/listas/empresas_analista'
import { Query_Listas_Empresas_Ativas } from '@/database/queries/listas/empresas_ativas'

export async function cfopResumo(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const bodySchema = z.object({
        data1: z.any(),
        data2: z.any(),
        analista: z.any(),
        todos: z.any(),
    })

    const { analista, data1, data2, todos } = bodySchema.parse(request.body)

    let listaAnalista: any[] = []

    const empresasAnalista: any = await Query_Listas_Empresas_Analista(`'${analista}'`)

    for (let i = 0; i < empresasAnalista.length; i++) {

        let dados: any = await CfopProdutosDetalhe(data1, data2, empresasAnalista[i].CODIGOEMPRESA, empresasAnalista[i].CODIGOESTAB)

        if (dados.length > 0) {
            listaAnalista.push(dados)
        }

    }

    let listaTodos: any[] = []

    if (todos) {
        
        const empresasAtivas: any = await Query_Listas_Empresas_Ativas()

        for (let i = 0; i < empresasAtivas.length; i++) {

            let dados: any = await CfopProdutosDetalhe(data1, data2, empresasAtivas[i].CODIGOEMPRESA, empresasAtivas[i].CODIGOESTAB)

            if (dados.length > 0) {
                listaTodos.push(dados)
            }

        }
    }



    return reply.status(200).send({
        eu: listaAnalista,
        todos: listaTodos
    })

}
