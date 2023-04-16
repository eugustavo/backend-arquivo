import { FastifyReply, FastifyRequest } from 'fastify'

export async function diferencaValorContabilRevisaoProdutos(request: FastifyRequest, reply: FastifyReply) {
  let resultJson, objEmpresa: any = {};
  let listaPendencias, listaTodos: any = [];
  let todos: string;
  let pendentes, vinculados, auditados: number;
  let I, J, K: number;

  const { data1, data2, analista } = request.body;


  return reply.status(200).send()
}

THorse.Post('/auditor_fiscal/diferencial_aliquota/revisao/produtos',
        procedure(Req: THorseRequest; Res: THorseResponse; Next: TProc)
        var
            LBody, resultJson, objEmpresa: TJSONObject;
            listaPendencias, listaTodos: TJSONArray;
            data1, data2, analista: String;
            pendentes, vinculados, auditados: Integer;
            I, J, K: Integer;
        begin

            AddLog('/auditor_fiscal/diferencial_aliquota/revisao/produtos');

            LBody := Req.Body<TJSONObject>;

            analista := LBody.GetValue<string>('analista');
            data1 := LBody.GetValue<string>('data1');
            data2 := LBody.GetValue<string>('data2');

            resultJson := TJSONObject.Create;

            with Dm_Difal do
            begin

                AddLog('Buscando Pendencias do Analista: ' + analista);

                sql_ProdutosRevisar_Eu.Active := False;
                sql_ProdutosRevisar_Eu.Params.ParamByName('ANALISTA').AsInteger := StrToInt(analista);
                sql_ProdutosRevisar_Eu.Params.ParamByName('DATA1').AsDate := StrToDate(data1);
                sql_ProdutosRevisar_Eu.Params.ParamByName('DATA2').AsDate := StrToDate(data2);
                sql_ProdutosRevisar_Eu.Active := True;

                AddLog('Registros Localizados: ' + IntToStr(sql_ProdutosRevisar_Eu.RecordCount));

                resultJson.AddPair('eu', sql_ProdutosRevisar_Eu.toJSONArray());

                AddLog('Buscando Pendencias de Todos');

                sql_ProdutosRevisar_Todos.Active := False;
                sql_ProdutosRevisar_Todos.Params.ParamByName('DATA1').AsDate := StrToDate(data1);
                sql_ProdutosRevisar_Todos.Params.ParamByName('DATA2').AsDate := StrToDate(data2);
                sql_ProdutosRevisar_Todos.Active := True;

                AddLog('Registros Localizados: ' + IntToStr(sql_ProdutosRevisar_Todos.RecordCount));

                resultJson.AddPair('todos', sql_ProdutosRevisar_Todos.toJSONArray());

            end;

            Res.Send<TJSONObject>(resultJson);

        end);