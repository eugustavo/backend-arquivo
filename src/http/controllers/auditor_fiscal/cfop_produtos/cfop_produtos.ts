// import { FastifyReply, FastifyRequest } from 'fastify'

// export async function cfopProdutos(request: FastifyRequest, reply: FastifyReply) {
//   let resultJson, objEmpresa: any = {};
//   let listaPendencias, listaTodos: any = [];
//   let pendentes, vinculados, auditados: number;
//   let I, J, K: number;

//   const { data1, data2, analista, todos } = request.body;

//   return reply.status(200).send()
// }

// THorse.Post('/auditor_fiscal/cfop_produtos',
// procedure(Req: THorseRequest; Res: THorseResponse; Next: TProc)
// var
//     LBody, resultJson, objEmpresa: TJSONObject;
//     listaPendencias, listaTodos: TJSONArray;
//     data1, data2, analista, todos: String;
//     pendentes, vinculados, auditados: Integer;
//     I, J, K: Integer;
// begin

//     AddLog('/auditor_fiscal/cfop_produtos');

//     LBody := Req.Body<TJSONObject>;

//     analista := LBody.GetValue<string>('analista');
//     todos := LBody.GetValue<string>('todos');
//     data1 := LBody.GetValue<string>('data1');
//     data2 := LBody.GetValue<string>('data2');

//     resultJson := TJSONObject.Create;
//     listaPendencias := TJSONArray.Create;
//     listaTodos := TJSONArray.Create;

//     with Dm_Listas do
//     begin

//         AddLog('Buscando Empresas do Analista: ' + analista);

//         sqlEmpresasAnalista.Active := False;
//         sqlEmpresasAnalista.Params.ParamByName('ANALISTA').AsInteger := StrToInt(analista);
//         sqlEmpresasAnalista.Active := True;

//         AddLog('Registros Localizados: ' + IntToStr(sqlEmpresasAnalista.RecordCount));

//         for I := 0 to sqlEmpresasAnalista.RecordCount - 1 do

//         begin

//             with Dm_CfopProdutos do
//             begin

//                 AddLog('Buscando Produtos da Empresa: ' + sqlEmpresasAnalista.FieldByName('CODIGOEMPRESA').asstring + ', Estab: ' +
//                   sqlEmpresasAnalista.FieldByName('CODIGOESTAB').asstring);

//                 sqlDetalhe.Active := False;
//                 sqlDetalhe.Params.ParamByName('EMPRESA1').AsInteger := StrToInt(sqlEmpresasAnalista.FieldByName('CODIGOEMPRESA').asstring);
//                 sqlDetalhe.Params.ParamByName('ESTAB1').AsInteger := StrToInt(sqlEmpresasAnalista.FieldByName('CODIGOESTAB').asstring);
//                 sqlDetalhe.Params.ParamByName('DATA1').AsDate := StrToDate(data1);
//                 sqlDetalhe.Params.ParamByName('DATA2').AsDate := StrToDate(data2);
//                 sqlDetalhe.Active := True;

//                 AddLog('Registros Localizados: ' + IntToStr(sqlDetalhe.RecordCount));

//                 if (sqlDetalhe.RecordCount > 0) then
//                 begin

//                     try

//                         pendentes := 0;
//                         vinculados := 0;
//                         auditados := 0;

//                         objEmpresa := TJSONObject.Create;

//                         objEmpresa.AddPair('empresa', sqlDetalhe.FieldByName('CODIGOEMPRESA').asstring);
//                         objEmpresa.AddPair('estab', sqlDetalhe.FieldByName('codigoestab').asstring);
//                         objEmpresa.AddPair('nome', sqlDetalhe.FieldByName('nomeestab').asstring);

//                         for J := 0 to sqlDetalhe.RecordCount - 1 do
//                         begin

//                             if (sqlDetalhe.FieldByName('CFOP_REL').asstring <> sqlDetalhe.FieldByName('CODIGOCFOP').asstring) then
//                             begin
//                                 pendentes := pendentes + 1;
//                             end;

//                             if ((sqlDetalhe.FieldByName('CFOP_REL').asstring = sqlDetalhe.FieldByName('CODIGOCFOP').asstring) and
//                               (sqlDetalhe.FieldByName('CSTIPI').AsInteger <> 49)) then
//                             begin
//                                 vinculados := vinculados + 1;
//                             end;

//                             if ((sqlDetalhe.FieldByName('CFOP_REL').asstring = sqlDetalhe.FieldByName('CODIGOCFOP').asstring) and
//                               (sqlDetalhe.FieldByName('CSTIPI').AsInteger = 49)) then
//                             begin
//                                 auditados := auditados + 1;
//                             end;

//                             sqlDetalhe.Next;

//                         end;

//                         objEmpresa.AddPair('pendentes', TJSONNumber.Create(pendentes));
//                         objEmpresa.AddPair('vinculados', TJSONNumber.Create(vinculados));
//                         objEmpresa.AddPair('auditados', TJSONNumber.Create(auditados));

//                         AddLog('Objeto Criado: ' + objEmpresa.ToString);

//                         listaPendencias.Add(objEmpresa);

//                     finally
//                         // objEmpresa.Free;
//                     end;

//                 end;

//                 sqlEmpresasAnalista.Next;

//             end;

//         end;

//         resultJson.AddPair('eu', listaPendencias);

//         if (todos = 'SIM') then
//         begin
//             AddLog('Buscando Empresas Ativas');

//             sqlEmpresasAtivas.Active := False;
//             sqlEmpresasAtivas.Active := True;

//             AddLog('Registros Localizados: ' + IntToStr(sqlEmpresasAtivas.RecordCount));

//             for I := 0 to sqlEmpresasAtivas.RecordCount - 1 do

//             begin
//                 with Dm_CfopProdutos do
//                 begin

//                     AddLog('Buscando Produtos da Empresa: ' + sqlEmpresasAtivas.FieldByName('CODIGOEMPRESA').asstring + ', Estab: ' +
//                       sqlEmpresasAtivas.FieldByName('CODIGOESTAB').asstring);

//                     sqlDetalhe.Active := False;
//                     sqlDetalhe.Params.ParamByName('EMPRESA1').AsInteger := StrToInt(sqlEmpresasAtivas.FieldByName('CODIGOEMPRESA').asstring);
//                     sqlDetalhe.Params.ParamByName('ESTAB1').AsInteger := StrToInt(sqlEmpresasAtivas.FieldByName('CODIGOESTAB').asstring);
//                     sqlDetalhe.Params.ParamByName('DATA1').AsDate := StrToDate(data1);
//                     sqlDetalhe.Params.ParamByName('DATA2').AsDate := StrToDate(data2);
//                     sqlDetalhe.Active := True;

//                     AddLog('Registros Localizados: ' + IntToStr(sqlDetalhe.RecordCount));

//                     if (sqlDetalhe.RecordCount > 0) then
//                     begin

//                         try

//                             pendentes := 0;
//                             vinculados := 0;
//                             auditados := 0;

//                             objEmpresa := TJSONObject.Create;

//                             objEmpresa.AddPair('empresa', sqlDetalhe.FieldByName('CODIGOEMPRESA').asstring);
//                             objEmpresa.AddPair('estab', sqlDetalhe.FieldByName('codigoestab').asstring);
//                             objEmpresa.AddPair('nome', sqlDetalhe.FieldByName('nomeestab').asstring);

//                             for J := 0 to sqlDetalhe.RecordCount - 1 do
//                             begin

//                                 if (sqlDetalhe.FieldByName('CFOP_REL').asstring <> sqlDetalhe.FieldByName('CODIGOCFOP').asstring) then
//                                 begin
//                                     pendentes := pendentes + 1;
//                                 end;

//                                 if ((sqlDetalhe.FieldByName('CFOP_REL').asstring = sqlDetalhe.FieldByName('CODIGOCFOP').asstring) and
//                                   (sqlDetalhe.FieldByName('CSTIPI').AsInteger <> 49)) then
//                                 begin
//                                     vinculados := vinculados + 1;
//                                 end;

//                                 if ((sqlDetalhe.FieldByName('CFOP_REL').asstring = sqlDetalhe.FieldByName('CODIGOCFOP').asstring) and
//                                   (sqlDetalhe.FieldByName('CSTIPI').AsInteger = 49)) then
//                                 begin
//                                     auditados := auditados + 1;
//                                 end;

//                                 sqlDetalhe.Next;

//                             end;

//                             objEmpresa.AddPair('pendentes', TJSONNumber.Create(pendentes));
//                             objEmpresa.AddPair('vinculados', TJSONNumber.Create(vinculados));
//                             objEmpresa.AddPair('auditados', TJSONNumber.Create(auditados));

//                             AddLog('Objeto Criado: ' + objEmpresa.ToString);

//                             listaTodos.Add(objEmpresa);

//                         finally
//                             // objEmpresa.Free;
//                         end;

//                     end;

//                     sqlEmpresasAtivas.Next;

//                 end;

//             end;

//             resultJson.AddPair('todos', listaTodos);
//         end;

//     end;

//     Res.Send<TJSONObject>(resultJson);
