import { FastifyReply, FastifyRequest } from 'fastify'

export async function informaMotivo(request: FastifyRequest, reply: FastifyReply) {
  let analistaJson: any = {};
  let I: number;

  const { chave, motivo } = request.body;


  return reply.status(200).send()
}

THorse.Post('/auditor_fiscal/notas_nao_lancadas/informa_motivo',
        procedure(Req: THorseRequest; Res: THorseResponse; Next: TProc)
        var
            LBody, analistaJson: TJSONObject;
            chave, motivo: String;
            I: Integer;
        begin

            AddLog('/auditor_fiscal/notas_nao_lancadas/informa_motivo');

            LBody := Req.Body<TJSONObject>;

            chave := LBody.GetValue<string>('chave');
            motivo := LBody.GetValue<string>('motivo');

            with Dm_NotasNaoLancadas do
            begin

                AddLog('Atualizando Motivo da Nota Chave: ' + chave);
                AddLog('Motivo: ' + motivo);
                AddLog('Chave: ' + chave);

                sqlUpdateMotivo.Params.ParamByName('MOTIVO').asstring := motivo;
                sqlUpdateMotivo.Params.ParamByName('CHAVE').asstring := chave;
                sqlUpdateMotivo.Prepare;
                sqlUpdateMotivo.ExecSQL;

            end;

            Res.Send('OK');

        end);