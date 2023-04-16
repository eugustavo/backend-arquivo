import { FastifyReply, FastifyRequest } from 'fastify'

export async function diferencaValorContabilRevisaoProdutosAtualizar(request: FastifyRequest, reply: FastifyReply) {
  let resultJson, objEmpresa: any = {};
  let listaPendencias, listaTodos: any = [];
  let pendentes, vinculados, auditados: number;
  let I, J, K: number;

  const { empresa, produto, aliquota } = request.body;


  return reply.status(200).send()
}

THorse.Post('/auditor_fiscal/diferencial_aliquota/revisao/produtos/atualizar',
        procedure(Req: THorseRequest; Res: THorseResponse; Next: TProc)
        var
            LBody, resultJson, objEmpresa: TJSONObject;
            listaPendencias, listaTodos: TJSONArray;
            empresa, produto, aliquota: String;
            pendentes, vinculados, auditados: Integer;
            I, J, K: Integer;
        begin

            AddLog('/auditor_fiscal/diferencial_aliquota/revisao/produtos/atualizar');

            LBody := Req.Body<TJSONObject>;

            empresa := LBody.GetValue<string>('empresa');
            produto := LBody.GetValue<string>('produto');
            aliquota := LBody.GetValue<string>('aliquota');

            resultJson := TJSONObject.Create;

            with Dm_Difal do
            begin

                sql_get_aliquota.Active := False;
                sql_get_aliquota.Params.ParamByName('EMPRESA').AsInteger := StrToInt(empresa);
                sql_get_aliquota.Params.ParamByName('PRODUTO').asstring := produto;
                sql_get_aliquota.Active := True;

                AddLog('Resultado da Busca: ' + IntToStr(sql_get_aliquota.RecordCount));

                if sql_get_aliquota.RecordCount = 0 then
                begin

                    sql_update_aliquota.Active := False;
                    sql_update_aliquota.Params.ParamByName('EMPRESA').AsInteger := StrToInt(empresa);
                    sql_update_aliquota.Params.ParamByName('PRODUTO').asstring := produto;
                    sql_update_aliquota.Params.ParamByName('ALIQUOTA').asstring := aliquota;
                    sql_update_aliquota.Prepare;
                    sql_update_aliquota.ExecSQL;

                    Res.Status(200).Send('INSERT');

                end
                else
                begin

                  sql_get_aliquota.Edit;
                  sql_get_aliquota.FieldByName('ALIQICMS').AsString := aliquota;
                  sql_get_aliquota.Post;

                  Res.Status(200).Send('UPDATE');

                end;

            end;

        end);