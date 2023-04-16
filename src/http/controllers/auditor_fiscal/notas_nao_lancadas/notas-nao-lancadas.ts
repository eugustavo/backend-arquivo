import { FastifyReply, FastifyRequest } from 'fastify'

export async function notasNaoLancadas(request: FastifyRequest, reply: FastifyReply) {
  let Notas: any = {};
  let I: number;

  const { empresa, estab, data1, data2 } = request.body;


  return reply.status(200).send()
}


THorse.Post('/auditor_fiscal/notas_nao_lancadas',
        procedure(Req: THorseRequest; Res: THorseResponse; Next: TProc)
        var
            LBody, Notas: TJSONObject;
            empresa, estab, data1, data2: String;
            I: Integer;
        begin

            AddLog('Endpoint Acionado: auditor_fiscal/notas_nao_lancadas');

            LBody := Req.Body<TJSONObject>;

            empresa := LBody.GetValue<string>('empresa');
            estab := LBody.GetValue<string>('estab');
            data1 := LBody.GetValue<string>('data1');
            data2 := LBody.GetValue<string>('data2');

            conexaoFB.Connected := True;

            AddLog('Buscando Dados da Empresa: ' + empresa);

            Notas := TJSONObject.Create;

            with Dm_NotasNaoLancadas do
            begin

                AddLog('Buscando Notas Modelo 55');

                sqlModelo55.Active := False;
                sqlModelo55.Params.ParamByName('EMPRESA').AsInteger := StrToInt(empresa);
                sqlModelo55.Params.ParamByName('ESTAB').AsInteger := StrToInt(estab);
                sqlModelo55.Params.ParamByName('DATA1').AsDate := StrToDate(data1);
                sqlModelo55.Params.ParamByName('DATA2').AsDate := StrToDate(data2);
                sqlModelo55.Active := True;

                AddLog('Registros Localizados: ' + IntToStr(sqlModelo55.RecordCount));

                Notas.AddPair('notas_55', sqlModelo55.toJSONArray());

                AddLog('Buscando Notas Modelo 57');

                sqlModelo57.Active := False;
                sqlModelo57.Params.ParamByName('EMPRESA').AsInteger := StrToInt(empresa);
                sqlModelo57.Params.ParamByName('ESTAB').AsInteger := StrToInt(estab);
                sqlModelo57.Params.ParamByName('DATA1').AsDate := StrToDate(data1);
                sqlModelo57.Params.ParamByName('DATA2').AsDate := StrToDate(data2);
                sqlModelo57.Active := True;

                AddLog('Registros Localizados: ' + IntToStr(sqlModelo57.RecordCount));

                Notas.AddPair('notas_57', sqlModelo57.toJSONArray());

            end;

            Res.Send<TJSONObject>(Notas);

        end);