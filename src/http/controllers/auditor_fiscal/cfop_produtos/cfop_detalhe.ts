import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { CfopProdutosDetalhe } from '@/database/queries/cfop_produtos/cfop_detalhe'
import { Query_Listas_Cfop_Empresas } from '@/database/queries/listas/cfop_empresa'
import { Query_Listas_Cst_Icms } from '@/database/queries/listas/cst_icms'
import { Query_Listas_Cst_Ipi } from '@/database/queries/listas/cst_ipi'


export async function cfopProdutos(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const bodySchema = z.object({
    data1: z.any(),
    data2: z.any(),
    empresa: z.any(),
    estab: z.any(),
  })

  function converteData(dataInformada: string): string {
    let data = dataInformada.split('/')
    return data[2] + '-' + data[1] + '-' + data[0]
  }

  const { data1, data2, empresa, estab } = bodySchema.parse(request.body)

  const detalhes: any = await CfopProdutosDetalhe(converteData(data1), converteData(data2), empresa, estab)
  const cfops: any = await Query_Listas_Cfop_Empresas(empresa, estab)
  const icms: any = await Query_Listas_Cst_Icms()
  const ipi: any = await Query_Listas_Cst_Ipi()

  return reply.status(200).send({
    detalhe: detalhes,
    cfop: cfops,
    cst_icms: icms,
    cst_ipi: ipi
  })
}
