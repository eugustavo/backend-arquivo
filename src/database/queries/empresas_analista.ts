export function empresasAnalista(data1: any, data2: any, analista: any) {
  return `SELECT
  d.nomeusuario,
  b.INSCRFEDERAL,
  b.NOMEESTAB,
  b.CODIGOEMPRESA,
  b.CODIGOESTAB,
  count(a.CHAVENFEENT) registros
  FROM lctofisent a
  INNER JOIN estab b ON (a.COMPLHIST = replace(b.INSCRESTAD, '.', '') and b.CVMAUDITOR = '${analista}' and b.DATAENCERATIV = '2100-12-31'
                  
                  AND cast(substr(cast(a.CHAVENFEENT AS varchar(44)), 7, 20) AS varchar (14)) <> replace(replace(replace(b.INSCRFEDERAL, '.', ''), '-', ''), '/', ''))
  LEFT JOIN lctofisent c ON (a.CHAVENFEENT = c.CHAVENFEENT
                        AND C.CODIGOEMPRESA = B.CODIGOEMPRESA
                        AND c.CODIGOESTAB = B.CODIGOESTAB)
  LEFT JOIN USUARIO D ON (b.CVMAUDITOR = d.CODIGOUSUARIO)                           
  WHERE a.codigoempresa = 9999
  AND a.datalctofis BETWEEN '${data1}' AND '${data2}'
  AND a.CDSITUACAO = '0'
  AND b.CODIGOESTAB IS NOT  NULL
  AND a.chavenfeentref is null
  AND c.CODIGOESTAB IS NULL
  group by 1,2,3,4,5
  order by 6 desc`
}
