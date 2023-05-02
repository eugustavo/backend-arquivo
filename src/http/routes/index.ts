import { FastifyInstance } from 'fastify'

import { nfs_indice } from '../controllers/auditor_fiscal/notas_nao_lancadas/indice'
import { nfs_detalhe } from '../controllers/auditor_fiscal/notas_nao_lancadas/detalhe'
import { nfs_informa_motivo } from '../controllers/auditor_fiscal/notas_nao_lancadas/informa_motivo'

import { cfopProdutos } from '../controllers/auditor_fiscal/cfop_produtos/cfop_produtos'
import { cfop_update_icms } from '../controllers/auditor_fiscal/cfop_produtos/atualizar_cst_icms'
import { cfop_update_ipi } from '../controllers/auditor_fiscal/cfop_produtos/atualizar_cst_ipi'
import { cfop_update_cfop } from '../controllers/auditor_fiscal/cfop_produtos/atualizar_cfop'

import { difal_dif_valor_detalhe } from '../controllers/auditor_fiscal/difal/dif_vl_contabil_detalhe'
import { difal_dif_valor } from '../controllers/auditor_fiscal/difal/dif_vl_contabil'
import { difal_ref_forn_todos } from '../controllers/auditor_fiscal/difal/rev_forn_todos'
import { difal_ref_forn_eu } from '../controllers/auditor_fiscal/difal/rev_forn_eu'
import { difal_ref_prod_todos } from '../controllers/auditor_fiscal/difal/rev_prod_todos'
import { difal_ref_prod_eu } from '../controllers/auditor_fiscal/difal/rev_prod_eu'
import { difal_get_aliq } from '../controllers/auditor_fiscal/difal/get_aliq'
import { difal_update_aliq } from '../controllers/auditor_fiscal/difal/atualizar_aliq'

import { listas_empresas_analista } from '../controllers/listas/empresas_analista'
import { listas_empresas_ativas } from '../controllers/listas/empresas_ativas'
import { listas_cfop_empresa } from '../controllers/listas/cfop_empresa'
import { listas_cst_icms } from '../controllers/listas/cst_icms'
import { listas_cst_ipi } from '../controllers/listas/cst_ipi'

import { sinc_funcionarios } from '../controllers/sincronizacao/funcionarios'

export async function appRoutes(app: FastifyInstance) {

  app.get('/', (request, reply) => {
    reply.send({
      message: 'HTTP Server is running on version ' + require('../../../package.json').version,
    })
  })

  // Notas não lançadas
  app.post('/auditor_fiscal/notas_nao_lancadas', nfs_indice)
  app.post('/auditor_fiscal/notas_nao_lancadas/detalhe', nfs_detalhe)
  app.post('/auditor_fiscal/notas_nao_lancadas/detalhe/informa_motivo', nfs_informa_motivo)

  // CFOP Produtos
  app.post('/auditor_fiscal/cfop_produtos', cfopProdutos)
  app.post('/auditor_fiscal/cfop_produtos/atualizar/icms', cfop_update_icms)
  app.post('/auditor_fiscal/cfop_produtos/atualizar/ipi', cfop_update_ipi)
  app.post('/auditor_fiscal/cfop_produtos/atualizar/cfop', cfop_update_cfop)

  // Diferencial de Aliquota
  app.post('/auditor_fiscal/difal/dif_vl_contabil', difal_dif_valor)
  app.post('/auditor_fiscal/difal/dif_vl_contabil_detalhe', difal_dif_valor_detalhe)
  app.post('/auditor_fiscal/difal/ref_forn_todos', difal_ref_forn_todos)
  app.post('/auditor_fiscal/difal/ref_forn_eu', difal_ref_forn_eu)
  app.post('/auditor_fiscal/difal/ref_prod_todos', difal_ref_prod_todos)
  app.post('/auditor_fiscal/difal/ref_prod_eu', difal_ref_prod_eu)
  app.post('/auditor_fiscal/difal/get_aliq', difal_get_aliq)
  app.post('/auditor_fiscal/difal/update_aliq', difal_update_aliq)

  // Listas
  app.post('/listas/empresas_analista', listas_empresas_analista)
  app.post('/listas/empresas_ativas', listas_empresas_ativas)
  app.post('/listas/cfop_empresa', listas_cfop_empresa)
  app.post('/listas/cst_icms', listas_cst_icms)
  app.post('/listas/cst_ipi', listas_cst_ipi)

  // Sincronização Questor
  app.get('/sincronizacao/funcionarios', sinc_funcionarios)
}
