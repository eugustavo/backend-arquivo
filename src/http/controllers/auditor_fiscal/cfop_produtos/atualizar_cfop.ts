import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { Cfop_Produtos_Update_Cfop } from '@/database/queries/cfop_produtos/cfop_update_cfop'
import { Cfop_Produtos_Update_Icms } from '@/database/queries/cfop_produtos/cfop_update_icms'
import { Cfop_Produtos_Update_Ipi } from '@/database/queries/cfop_produtos/cfop_update_ipi'

export async function cfop_update_cfop(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const bodySchema = z.object({
    cfopref: z.any(),
    cst_icms: z.any(),
    cst_ipi: z.any(),
    itens: z.any(),
  })

  const { cfopref, cst_icms, cst_ipi, itens } = bodySchema.parse(request.body)

  for (let i = 0; i < itens.length; i++) {

    let empresa = itens[i].codigoempresa
    let estab = itens[i].codigoestab
    let refNota = itens[i].refNota
    let codPessoa = itens[i].codigopessoa
    let codCfopOrigem = itens[i].codigocfoporigem

    if (cfopref) {
      await Cfop_Produtos_Update_Cfop(cfopref, empresa, estab, refNota, codPessoa, codCfopOrigem)
    }
    if (cst_icms) {
      await Cfop_Produtos_Update_Icms(cst_icms, empresa, estab, refNota, codPessoa, codCfopOrigem)
    }
    if (cst_ipi) {
      await Cfop_Produtos_Update_Ipi(cst_ipi, empresa, estab, refNota, codPessoa, codCfopOrigem)
    }

  }



  reply.send({
    message: 'ok'
  })
}
