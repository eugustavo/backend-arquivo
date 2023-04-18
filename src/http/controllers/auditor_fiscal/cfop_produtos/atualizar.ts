// import { FastifyReply, FastifyRequest } from 'fastify'

// export async function atualizar(request: FastifyRequest, reply: FastifyReply) {
//   let prodAtual: any = {};
//   let produtos: any = [];
//   let empresa, estab, refNota, codPessoa, codCfopOrigem: string;
//   let I: number;

//   const { cfopRef, cstIPI, cstICMS } = request.body;

//   return reply.status(200).send()
// }

// THorse.Post('/auditor_fiscal/cfop_produtos/atualizar',
//         procedure(Req: THorseRequest; Res: THorseResponse; Next: TProc)
//         var
//             LBody: TJSONObject;
//             cfopRef, cstICMS, cstIPI: String;
//             empresa, estab, refNota, codPessoa, codCfopOrigem: String;
//             produtos: TJSONArray;
//             prodAtual: TJSONObject;
//             I: Integer;
//         begin

//             AddLog('/auditor_fiscal/cfop_produtos/atualizar');

//             LBody := Req.Body<TJSONObject>;

//             AddLog('Dados Recebidos: ' + LBody.ToString);

//             cfopRef := LBody.GetValue<string>('cfopref');
//             cstICMS := LBody.GetValue<string>('cst_icms');
//             cstIPI := LBody.GetValue<string>('cst_ipi');

//             produtos := LBody.GetValue<TJSONArray>('itens') as TJSONArray;

//             for I := 0 to produtos.Count - 1 do
//             begin

//                 prodAtual := produtos.Items[I] as TJSONObject;

//                 AddLog('Item Recebido: ' + prodAtual.GetValue<string>('descrproduto'));

//                 empresa := prodAtual.GetValue<string>('codigoempresa');
//                 estab := prodAtual.GetValue<string>('codigoestab');
//                 refNota := prodAtual.GetValue<string>('refNota');
//                 codPessoa := prodAtual.GetValue<string>('codigopessoa');
//                 codCfopOrigem := prodAtual.GetValue<string>('codigocfoporigem');

//                 with Dm_CfopProdutos do
//                 begin

//                     AddLog('Atualizando Registros ');

//                     if cfopRef <> '' then
//                     begin

//                         AddLog('Atualizando CFOP para ' + cfopRef);

//                         sqlUpdateCFOP.Active := False;
//                         sqlUpdateCFOP.Params.ParamByName('CFOPREF').asstring := cfopRef;

//                         sqlUpdateCFOP.Params.ParamByName('EMPRESA').asstring := empresa;
//                         sqlUpdateCFOP.Params.ParamByName('ESTAB').asstring := estab;
//                         sqlUpdateCFOP.Params.ParamByName('REF_NOTA').asstring := refNota;
//                         sqlUpdateCFOP.Params.ParamByName('COD_PESSOA').asstring := codPessoa;
//                         sqlUpdateCFOP.Params.ParamByName('COD_CFOP_ORIGEM').asstring := codCfopOrigem;

//                         sqlUpdateCFOP.Prepare;
//                         sqlUpdateCFOP.ExecSQL;

//                         AddLog('Atualizou a CFOP para ' + cfopRef);

//                     end;

//                     if cstICMS <> '' then
//                     begin

//                         AddLog('Atualizando CST ICMS para ' + cstICMS);

//                         sqlUpdateCstIcms.Active := False;
//                         sqlUpdateCstIcms.Params.ParamByName('CST_ICMS').asstring := cstICMS;

//                         sqlUpdateCstIcms.Params.ParamByName('EMPRESA').asstring := empresa;
//                         sqlUpdateCstIcms.Params.ParamByName('ESTAB').asstring := estab;
//                         sqlUpdateCstIcms.Params.ParamByName('REF_NOTA').asstring := refNota;
//                         sqlUpdateCstIcms.Params.ParamByName('COD_PESSOA').asstring := codPessoa;
//                         sqlUpdateCstIcms.Params.ParamByName('COD_CFOP_ORIGEM').asstring := codCfopOrigem;

//                         sqlUpdateCstIcms.Prepare;
//                         sqlUpdateCstIcms.ExecSQL;

//                         AddLog('Atualizou o CST ICMS para ' + cstICMS);

//                     end;

//                     if cstIPI <> '' then
//                     begin

//                         AddLog('Atualizando CST IPI para ' + cstIPI);

//                         sqlUpdateCstIpi.Active := False;
//                         sqlUpdateCstIpi.Params.ParamByName('CST_IPI').asstring := cstIPI;

//                         sqlUpdateCstIpi.Params.ParamByName('EMPRESA').asstring := empresa;
//                         sqlUpdateCstIpi.Params.ParamByName('ESTAB').asstring := estab;
//                         sqlUpdateCstIpi.Params.ParamByName('REF_NOTA').asstring := refNota;
//                         sqlUpdateCstIpi.Params.ParamByName('COD_PESSOA').asstring := codPessoa;
//                         sqlUpdateCstIpi.Params.ParamByName('COD_CFOP_ORIGEM').asstring := codCfopOrigem;

//                         sqlUpdateCstIpi.Prepare;
//                         sqlUpdateCstIpi.ExecSQL;

//                         AddLog('Atualizou o CST IPI para ' + cstIPI);

//                     end;

//                 end;

//             end;

//             Res.Send('OK');

//         end);
