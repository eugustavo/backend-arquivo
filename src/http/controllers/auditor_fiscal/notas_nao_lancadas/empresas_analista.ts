import { FastifyReply, FastifyRequest } from 'fastify'

export async function empresaAnalista(request: FastifyRequest, reply: FastifyReply) {
  let analistaJson: any = {};
  let I: number;

  const { data1, data2, analista } = request.body;


  return reply.status(200).send()
}

THorse.Post('/auditor_fiscal/notas_nao_lancadas/empresas_analista',
        procedure(Req: THorseRequest; Res: THorseResponse; Next: TProc)
        var
            LBody, analistaJson: TJSONObject;
            data1, data2, analista: String;
            I: Integer;
        begin

            AddLog('/auditor_fiscal/notas_nao_lancadas/empresas_analista');

            LBody := Req.Body<TJSONObject>;

            analista := LBody.GetValue<string>('analista');
            data1 := LBody.GetValue<string>('data1');
            data2 := LBody.GetValue<string>('data2');

            conexaoFB.Connected := True;

            analistaJson := TJSONObject.Create;

            with Dm_NotasNaoLancadas do
            begin

                AddLog('Buscando Notas Pendentes do Analista: ' + analista);

                sqlEmpresasAnalista.Active := False;
                sqlEmpresasAnalista.Params.ParamByName('ANALISTA').AsInteger := StrToInt(analista);
                sqlEmpresasAnalista.Params.ParamByName('DATA1').AsDate := StrToDate(data1);
                sqlEmpresasAnalista.Params.ParamByName('DATA2').AsDate := StrToDate(data2);
                sqlEmpresasAnalista.Active := True;

                AddLog('Registros Localizados: ' + IntToStr(sqlEmpresasAnalista.RecordCount));

                analistaJson.AddPair('eu', sqlEmpresasAnalista.toJSONArray());

                AddLog('Buscando Notas Pendentes de Todos');

                sqlEmpresas.Active := False;
                sqlEmpresas.Params.ParamByName('DATA1').AsDate := StrToDate(data1);
                sqlEmpresas.Params.ParamByName('DATA2').AsDate := StrToDate(data2);
                sqlEmpresas.Active := True;

                AddLog('Registros Localizados: ' + IntToStr(sqlEmpresas.RecordCount));

                analistaJson.AddPair('todos', sqlEmpresas.toJSONArray());

            end;

            Res.Send<TJSONObject>(analistaJson);

        end);