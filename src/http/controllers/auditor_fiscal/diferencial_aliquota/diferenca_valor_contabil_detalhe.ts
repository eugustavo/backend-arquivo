import { FastifyReply, FastifyRequest } from 'fastify'

export async function diferencaValorContabilDetalhe(request: FastifyRequest, reply: FastifyReply) {
  let resultJson, objEmpresa: any = {};
  let listaPendencias, listaTodos: any = [];
  let todos: string;
  let pendentes, vinculados, auditados: number;
  let I, J, K: number;

  const { data1, data2, empresa, estab } = request.body;


  return reply.status(200).send()
}

THorse.Post('/auditor_fiscal/diferencial_aliquota/diferenca_valor_contabil/detalhe',
        procedure(Req: THorseRequest; Res: THorseResponse; Next: TProc)
        var
            LBody, resultJson, objEmpresa: TJSONObject;
            listaPendencias, listaTodos: TJSONArray;
            data1, data2, empresa, estab: String;
            pendentes, vinculados, auditados: Integer;
            I, J, K: Integer;
        begin

            AddLog('/auditor_fiscal/diferencial_aliquota/diferenca_valor_contabil/detalhe');

            LBody := Req.Body<TJSONObject>;

            empresa := LBody.GetValue<string>('empresa');
            estab := LBody.GetValue<string>('estab');
            data1 := LBody.GetValue<string>('data1');
            data2 := LBody.GetValue<string>('data2');

            resultJson := TJSONObject.Create;

            with Dm_Difal do
            begin

                AddLog('Buscando Detalhes da Empresa: ' + empresa + ', Estab: ' + estab);

                sql_Diferenca_Valor_Contabil_Detalhe.Active := False;
                sql_Diferenca_Valor_Contabil_Detalhe.Params.ParamByName('EMPRESA').AsInteger := StrToInt(empresa);
                sql_Diferenca_Valor_Contabil_Detalhe.Params.ParamByName('ESTAB').AsInteger := StrToInt(estab);
                sql_Diferenca_Valor_Contabil_Detalhe.Params.ParamByName('DATA1').AsDate := StrToDate(data1);
                sql_Diferenca_Valor_Contabil_Detalhe.Params.ParamByName('DATA2').AsDate := StrToDate(data1);
                sql_Diferenca_Valor_Contabil_Detalhe.Active := True;

                AddLog('Registros Localizados: ' + IntToStr(sql_Diferenca_Valor_Contabil_Detalhe.RecordCount));

            end;

            Res.Send<TJSONArray>(Dm_Difal.sql_Diferenca_Valor_Contabil_Detalhe.toJSONArray());

        end);