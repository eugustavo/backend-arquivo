import { FastifyInstance } from 'fastify'

import { nfs_indice } from '../controllers/auditor_fiscal/notas_nao_lancadas/indice'
import { nfs_detalhe } from '../controllers/auditor_fiscal/notas_nao_lancadas/detalhe'
import { informaMotivo } from '../controllers/auditor_fiscal/notas_nao_lancadas/informa_motivo'

import { cfopProdutos } from '../controllers/auditor_fiscal/cfop_produtos/cfop_produtos'
import { atualizar } from '../controllers/auditor_fiscal/cfop_produtos/atualizar'

import { diferencaValorContabil } from '../controllers/auditor_fiscal/diferencial_aliquota/diferenca_valor_contabil'
import { diferencaValorContabilDetalhe } from '../controllers/auditor_fiscal/diferencial_aliquota/diferenca_valor_contabil_detalhe'
import { diferencaValorContabilRevisaoProdutosAtualizar } from '../controllers/auditor_fiscal/diferencial_aliquota/revisao_produtos_atualizar'
import { diferencaValorContabilRevisaoProdutos } from '../controllers/auditor_fiscal/diferencial_aliquota/revisao_produtos'
import { diferencaValorContabilRevisaoFornecedores } from '../controllers/auditor_fiscal/diferencial_aliquota/revisao_fornecedores'

export async function appRoutes(app: FastifyInstance) {
  // Notas não lançadas
  app.post('/auditor_fiscal/notas_nao_lancadas', nfs_indice)
  app.post('/auditor_fiscal/notas_nao_lancadas/detalhe', nfs_detalhe)
  app.post('/auditor_fiscal/notas_nao_lancadas/informa_motivo', informaMotivo)

  // CFOP Produtos
  app.post('/auditor_fiscal/cfop_produtos', cfopProdutos)
  app.post('/auditor_fiscal/cfop_produtos/atualizar', atualizar)

  // Diferencial de Aliquota
  app.post(
    '/auditor_fiscal/diferencial_aliquota/diferenca_valor_contabil',
    diferencaValorContabil,
  )
  app.post(
    '/auditor_fiscal/diferencial_aliquota/diferenca_valor_contabil/detalhe',
    diferencaValorContabilDetalhe,
  )
  app.post(
    '/auditor_fiscal/diferencial_aliquota/revisao/produtos',
    diferencaValorContabilRevisaoProdutos,
  )
  app.post(
    '/auditor_fiscal/diferencial_aliquota/revisao/produtos/atualizar',
    diferencaValorContabilRevisaoProdutosAtualizar,
  )
  app.post(
    '/auditor_fiscal/diferencial_aliquota/revisao/fornecedores',
    diferencaValorContabilRevisaoFornecedores,
  )
}
