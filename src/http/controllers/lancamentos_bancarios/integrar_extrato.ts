import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import {
    query_extrato_insert,
    query_existe_conta_cadastrada,
    query_existe_agencia,
    query_cadastra_conta,
    query_seq_agencia,
    query_seq_conta,
    query_cadastra_agencia

} from '@/database/queries/lancamentos_bancarios/integrar_extrato'

export async function extrato_insert(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const bodySchema = z.object({
        empresa: z.any(),
        estab: z.any(),
        conta_ctb: z.any(),
        data: z.any(),
        seq: z.any(),
        numero: z.any(),
        tipo: z.any(),
        valor: z.any(),
        descricao: z.any(),
        dados_conta_agencia: z.any(),
        dados_conta_agencia_digito: z.any(),
        dados_conta_conta: z.any(),
        dados_conta_conta_digito: z.any(),
        dados_conta_banco: z.any(),
    })

    const { empresa, estab, conta_ctb, data, seq, numero, tipo, valor, descricao, dados_conta_agencia, dados_conta_agencia_digito, dados_conta_conta, dados_conta_conta_digito, dados_conta_banco } = bodySchema.parse(request.body)

    const existeConta: any = await query_existe_conta_cadastrada(dados_conta_agencia, dados_conta_conta, dados_conta_conta_digito, dados_conta_banco)

    if (existeConta.rowCount > 0) {

        await query_extrato_insert(empresa, estab, conta_ctb, data, seq, numero, tipo, valor, descricao)

    } else {

        const existeAgencia: any = await query_existe_agencia(dados_conta_agencia, dados_conta_banco, dados_conta_agencia_digito)

        console.log('Existe Agência: ' , existeAgencia)

        if (existeAgencia.rowCount == 0) {

            const getSeqAgencia: any = await query_seq_agencia()

            await query_cadastra_agencia(dados_conta_banco, dados_conta_agencia, dados_conta_agencia_digito, getSeqAgencia)

            const existeAgencia: any = await query_existe_agencia(dados_conta_agencia, dados_conta_banco, dados_conta_agencia_digito)

            if (existeAgencia.rowCount > 0) {
                
                const getSeqConta: any = await query_seq_conta()
                console.log('getSeqContaObtido:' + getSeqConta)

                await query_cadastra_conta(getSeqConta, dados_conta_banco, existeAgencia.numeroagencia, dados_conta_conta, dados_conta_conta_digito)

                await query_extrato_insert(empresa, estab, conta_ctb, data, seq, numero, tipo, valor, descricao)
            }

        } else {

            const getSeq: any = await query_seq_conta()

            await query_cadastra_conta(getSeq, dados_conta_banco, existeAgencia.numeroagencia, dados_conta_conta, dados_conta_conta_digito)

            await query_extrato_insert(empresa, estab, conta_ctb, data, seq, numero, tipo, valor, descricao)

        }

    }



    reply.send({
        message: 'ok'
    })
}
