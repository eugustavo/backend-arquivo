import { FastifyInstance } from 'fastify'

import { nfs_indice } from '../controllers/auditor_fiscal/notas_nao_lancadas/indice'
import { nfs_detalhe } from '../controllers/auditor_fiscal/notas_nao_lancadas/detalhe'
import { nfs_informa_motivo } from '../controllers/auditor_fiscal/notas_nao_lancadas/informa_motivo'

import { cfopProdutos } from '../controllers/auditor_fiscal/cfop_produtos/cfop_detalhe'
import { cfopResumo } from '../controllers/auditor_fiscal/cfop_produtos/cfop_resumo'
import { cfop_update_cfop } from '../controllers/auditor_fiscal/cfop_produtos/atualizar_cfop'

import { difal_dif_valor_detalhe } from '../controllers/auditor_fiscal/difal/dif_vl_contabil_detalhe'
import { difal_dif_valor } from '../controllers/auditor_fiscal/difal/dif_vl_contabil'
import { difal_ref_prod } from '../controllers/auditor_fiscal/difal/rev_prod'
import { difal_ref_forn } from '../controllers/auditor_fiscal/difal/rev_forn'
import { difal_get_aliq } from '../controllers/auditor_fiscal/difal/get_aliq'
import { difal_update_aliq } from '../controllers/auditor_fiscal/difal/atualizar_aliq'
import { difal_difa_antecipacao } from '../controllers/auditor_fiscal/difal/difa_antecipacao'

import { listas_empresas_analista } from '../controllers/listas/empresas_analista'
import { listas_empresas_ativas } from '../controllers/listas/empresas_ativas'
import { listas_cfop_empresa } from '../controllers/listas/cfop_empresa'
import { listas_cst_icms } from '../controllers/listas/cst_icms'
import { listas_cst_ipi } from '../controllers/listas/cst_ipi'

import { sinc_funcionarios } from '../controllers/sincronizacao/funcionarios'
import { sinc_operadores } from '../controllers/sincronizacao/operadores'


var os = require("os");
var hostname = os.hostname();

export async function appRoutes(app: FastifyInstance) {

  app.get('/', (request, reply) => {
    reply.send({
      message: 'HTTP Server is running on version ' + require('../../../package.json').version + ' at ' + hostname,
    })
  })

  // Notas não lançadas
  app.post('/auditor_fiscal/notas_nao_lancadas', nfs_indice)
  app.post('/auditor_fiscal/notas_nao_lancadas/detalhe', nfs_detalhe)
  app.post('/auditor_fiscal/notas_nao_lancadas/detalhe/informa_motivo', nfs_informa_motivo)

  // CFOP Produtos
  app.post('/auditor_fiscal/cfop_produtos', cfopResumo)
  app.post('/auditor_fiscal/cfop_produtos/detalhe', cfopProdutos)
  app.post('/auditor_fiscal/cfop_produtos/atualizar', cfop_update_cfop)

  // Diferencial de Aliquota
  app.post('/auditor_fiscal/difal/dif_vl_contabil', difal_dif_valor)
  app.post('/auditor_fiscal/difal/dif_vl_contabil_detalhe', difal_dif_valor_detalhe)
  app.post('/auditor_fiscal/difal/ref_prod', difal_ref_prod)
  app.post('/auditor_fiscal/difal/ref_forn', difal_ref_forn)
  app.post('/auditor_fiscal/difal/get_aliq', difal_get_aliq)
  app.post('/auditor_fiscal/difal/update_aliq', difal_update_aliq)
  app.post('/auditor_fiscal/difal/difa_antecipacao', difal_difa_antecipacao)
  app.post('/auditor_fiscal/difal/difa_antecipacao/inserir', difal_difa_antecipacao)


  // Listas
  app.post('/listas/empresas_analista', listas_empresas_analista)
  app.post('/listas/empresas_ativas', listas_empresas_ativas)
  app.post('/listas/cfop_empresa', listas_cfop_empresa)
  app.post('/listas/cst_icms', listas_cst_icms)
  app.post('/listas/cst_ipi', listas_cst_ipi)

  // Sincronização Questor
  app.get('/sincronizacao/funcionarios', sinc_funcionarios)
  app.get('/sincronizacao/operadores', sinc_operadores)
}
