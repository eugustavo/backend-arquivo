import { FastifyInstance } from 'fastify'

import { notasNaoLancadas } from '../controllers/auditor_fiscal/notas_nao_lancadas/notas-nao-lancadas'
import { empresaAnalista } from '../controllers/auditor_fiscal/notas_nao_lancadas/empresas_analista'
import { informaMotivo } from '../controllers/auditor_fiscal/notas_nao_lancadas/informa_motivo'

import { cfopProdutos } from '../controllers/auditor_fiscal/cfop_produtos/cfop_produtos'
import { detalhe } from '../controllers/auditor_fiscal/cfop_produtos/detalhe'
import { atualizar } from '../controllers/auditor_fiscal/cfop_produtos/atualizar'

import { diferencaValorContabil } from '../controllers/auditor_fiscal/diferencial_aliquota/diferenca_valor_contabil'
import { diferencaValorContabilDetalhe } from '../controllers/auditor_fiscal/diferencial_aliquota/diferenca_valor_contabil_detalhe'
import { diferencaValorContabilRevisaoProdutosAtualizar } from '../controllers/auditor_fiscal/diferencial_aliquota/revisao_produtos_atualizar'
import { diferencaValorContabilRevisaoProdutos } from '../controllers/auditor_fiscal/diferencial_aliquota/revisao_produtos'
import { diferencaValorContabilRevisaoFornecedores } from '../controllers/auditor_fiscal/diferencial_aliquota/revisao_fornecedores'

export async function appRoutes(app: FastifyInstance) {
  // Notas não lançadas
  app.post('/auditor_fiscal/notas_nao_lancadas', notasNaoLancadas)
  app.post(
    '/auditor_fiscal/notas_nao_lancadas/empresas_analista',
    empresaAnalista,
  )
  app.post('/auditor_fiscal/notas_nao_lancadas/informa_motivo', informaMotivo)

  //
  // CFOP Produtos
  app.post('/auditor_fiscal/cfop_produtos', cfopProdutos)
  app.post('/auditor_fiscal/cfop_produtos/detalhe', detalhe)
  app.post('/auditor_fiscal/cfop_produtos/atualizar', atualizar)

  //
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
    '/auditor_fiscal/diferencial_aliquota/revisao/produtos/atualizar',
    diferencaValorContabilRevisaoFornecedores,
  )
}
