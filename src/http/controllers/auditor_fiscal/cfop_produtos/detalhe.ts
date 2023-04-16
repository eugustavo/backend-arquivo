import { FastifyReply, FastifyRequest } from 'fastify'

export async function detalhe(request: FastifyRequest, reply: FastifyReply) {
  let resultJson: any = {};
  let I: number;

  const { data1, data2, empresa, estab } = request.body;


  return reply.status(200).send()
}

THorse.Post('/auditor_fiscal/cfop_produtos/detalhe',
        procedure(Req: THorseRequest; Res: THorseResponse; Next: TProc)
        var
            LBody, resultJson: TJSONObject;
            data1, data2, empresa, estab: String;
            I: Integer;
        begin

            AddLog('/auditor_fiscal/cfop_produtos/detalhe');

            LBody := Req.Body<TJSONObject>;

            empresa := LBody.GetValue<string>('empresa');
            estab := LBody.GetValue<string>('estab');
            data1 := LBody.GetValue<string>('data1');
            data2 := LBody.GetValue<string>('data2');

            conexaoFB.Connected := True;

            resultJson := TJSONObject.Create;

            with Dm_CfopProdutos do
            begin

                AddLog('Buscando Produtos da Empresa: ' + empresa + ', Estab: ' + estab);

                sqlDetalhe.Active := False;
                sqlDetalhe.Params.ParamByName('EMPRESA1').AsInteger := StrToInt(empresa);
                sqlDetalhe.Params.ParamByName('ESTAB1').AsInteger := StrToInt(estab);
                sqlDetalhe.Params.ParamByName('DATA1').AsDate := StrToDate(data1);
                sqlDetalhe.Params.ParamByName('DATA2').AsDate := StrToDate(data2);
                sqlDetalhe.Active := True;

                AddLog('Registros Localizados: ' + IntToStr(sqlDetalhe.RecordCount));

                resultJson.AddPair('empresa', Dm_CfopProdutos.sqlDetalhe.FieldByName('nomeestab').asstring);
                resultJson.AddPair('detalhe', sqlDetalhe.toJSONArray());

            end;

            with Dm_Listas do
            begin

                AddLog('Buscando CFOPS Validos da Empresa: ' + empresa + ', Estab: ' + estab);

                sqlCFOP.Active := False;
                sqlCFOP.Params.ParamByName('EMPRESA').AsInteger := StrToInt(empresa);
                sqlCFOP.Params.ParamByName('ESTAB').AsInteger := StrToInt(estab);
                sqlCFOP.Active := True;

                AddLog('Registros Localizados: ' + IntToStr(sqlCFOP.RecordCount));

                resultJson.AddPair('cfop', sqlCFOP.toJSONArray());

            end;

            with Dm_Listas do
            begin

                AddLog('Buscando CST ICMS');

                sqlCstIcms.Active := False;
                sqlCstIcms.Active := True;

                AddLog('Registros Localizados: ' + IntToStr(sqlCstIcms.RecordCount));

                resultJson.AddPair('cst_icms', sqlCstIcms.toJSONArray());

            end;

            with Dm_Listas do
            begin

                AddLog('Buscando CST IPI');

                sqlCstIpi.Active := False;
                sqlCstIpi.Active := True;

                AddLog('Registros Localizados: ' + IntToStr(sqlCstIpi.RecordCount));

                resultJson.AddPair('cst_ipi', sqlCstIpi.toJSONArray());

            end;

            Res.Send<TJSONObject>(resultJson);

        end);