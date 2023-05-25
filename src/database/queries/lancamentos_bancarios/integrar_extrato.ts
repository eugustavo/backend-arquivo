import firebird from 'node-firebird'
import { options } from '../../../lib/firebird'

export function query_extrato_insert(empresa: any, estab: any, conta_ctb: any, data: any, seq: any, numero: any, tipo: any, valor: any, descricao: any) {

  console.log('Função Acionada: query_extrato_insert')

  const sql = `EXECUTE PROCEDURE SIGRA_EXTRATO_INSERT('${empresa}', '${estab}', '${conta_ctb}', '${data}', '${seq}', '${numero}', '${tipo}', '${valor}', '${descricao}')`

  console.log(sql)

  return new Promise((resolve, reject) => {
    firebird.attach(options, function (err: any, db: any): any {
      if (err) {
        console.error('Erro na Conexão: ', err)
        reject(err)
      }
      db.query(sql, function (err: any, result: any): any {
        if (err) {
          console.error('Erro na Query: ', err)
          reject(err)
        } else {
          resolve(result)
        }
        db.detach()
      })
    })
  })
}

export function query_existe_conta_cadastrada(agencia: any, conta: any, digito: any, banco: any) {

  console.log('Função Acionada: query_existe_conta_cadastrada')

  const sql = `select count(*) as QTDE from CONTABANCARIA A WHERE A.CODIGOBANCO = '${banco}' AND A.NUMEROAGENCIA = '${agencia}' AND A.NUMEROCONTA = '${conta}' AND A.DIGITOCONTA = '${digito}'`

  console.log(sql)

  return new Promise((resolve, reject) => {
    firebird.attach(options, function (err: any, db: any): any {
      if (err) {
        console.error('Erro na Conexão: ', err)
        reject(err)
      }
      
      db.query(sql, function (err: any, result: any): any {
        if (err) {
          console.error('Erro na Query: ', err)
          reject(err)
        } else {
          resolve(result[0].QTDE)
        }
        db.detach()
      })
    })
  })
}
export function query_get_conta_cadastrada(agencia: any, conta: any, digito: any, banco: any) {

  console.log('Função Acionada: query_get_conta_cadastrada')

  const sql = `select CODIGOCONTABANCARIA from CONTABANCARIA A WHERE A.CODIGOBANCO = '${banco}' AND A.NUMEROAGENCIA = '${agencia}' AND A.NUMEROCONTA = '${conta}' AND A.DIGITOCONTA = '${digito}'`

  console.log(sql)

  return new Promise((resolve, reject) => {
    firebird.attach(options, function (err: any, db: any): any {
      if (err) {
        console.error('Erro na Conexão: ', err)
        reject(err)
      }
      db.query(sql, function (err: any, result: any): any {
        if (err) {
          console.error('Erro na Query: ', err)
          reject(err)
        } else {
          resolve(result[0].CODIGOCONTABANCARIA)
        }
        db.detach()
      })
    })
  })
}
export function query_existe_agencia(agencia: any, banco: any) {

  console.log('Função Acionada: query_existe_agencia')

  const sql = `select count(*) as QTDE from AGENCIA A WHERE A.CODIGOBANCO = '${banco}' AND A.NUMEROAGENCIA = '${agencia}' `

  console.log(sql)

  return new Promise((resolve, reject) => {
    firebird.attach(options, function (err: any, db: any): any { 
      if (err) {
        console.error('Erro na Conexão: ', err)
        reject(err)
      }

      db.query(sql, function (err: any, result: any): any {
        
        if (err) {
          console.error('Erro na Query: ', err)
          reject(err)
        } else {
          resolve(result[0].QTDE)
        }
        db.detach()
      })
    })
  })
}
export function query_get_agencia(agencia: any, banco: any) {

  console.log('Função Acionada: query_get_agencia')

  const sql = `select NUMEROAGENCIA from AGENCIA A WHERE A.CODIGOBANCO = '${banco}' AND A.NUMEROAGENCIA = '${agencia}' `

  console.log(sql)

  return new Promise((resolve, reject) => {
    firebird.attach(options, function (err: any, db: any): any {
      if (err) {
        console.error('Erro na Conexão: ', err)
        reject(err)
      }
      db.query(sql, function (err: any, result: any): any {
        if (err) {
          console.error('Erro na Query: ', err)
          reject(err)
        } else {
          resolve(result[0].NUMEROAGENCIA)
        }
        db.detach()
      })
    })
  })
}
export function query_seq_agencia() {

  console.log('Função Acionada: query_seq_agencia')

  const sql = `SELECT MAX(CODIGOAGENCIABANC)+1 AS SEQ FROM AGENCIA `

  console.log(sql)

  return new Promise((resolve, reject) => { 
    firebird.attach(options, function (err: any, db: any): any {
      if (err) {
        console.error('Erro na Conexão: ', err)
        reject(err)
      }
      db.query(sql, function (err: any, result: any): any {
        if (err) {
          console.error('Erro na Query: ', err)
          reject(err)
        } else {
          resolve(result[0].SEQ)
        }
        db.detach()
      })
    })
  })
}
export function query_seq_conta() {

  console.log('Função Acionada: query_seq_conta')

  const sql = `SELECT MAX(CODIGOCONTABANCARIA)+1 AS SEQ FROM CONTABANCARIA`

  console.log(sql)

  return new Promise((resolve, reject) => {
    firebird.attach(options, function (err: any, db: any): any {
      if (err) {
        console.error('Erro na Conexão: ', err)
        reject(err)
      }
      db.query(sql, function (err: any, result: any): any {
        if (err) {
          console.error('Erro na Query: ', err)
          reject(err)
        } else {
          resolve(result[0].SEQ)
        }
        db.detach()
      })
    })
  })
}
export function query_seq_vinc_empresa( empresa: any) {

  console.log('Função Acionada: query_seq_vinc_empresa')

  const sql = `select coalesce(max(seq)+1,1) AS SEQ from CONTABANCARIAEMPRESA where codigoempresa = ${empresa}`

  console.log(sql)

  return new Promise((resolve, reject) => {
    firebird.attach(options, function (err: any, db: any): any {
      
      if (err) {
        
        console.error('Erro na Conexão: ', err)
        reject(err)
      }
      
      db.query(sql, function (err: any, result: any): any {
        
        if (err) {
          console.error('Erro na Query: ', err)
          reject(err)
        } else {
          resolve(result[0].SEQ)
        }
        db.detach()
      })
    })
  })
}
export function query_cadastra_agencia(banco: any, agencia: any, digito: any, seq: any) {

  console.log('Função Acionada: query_cadastra_agencia')

  const sql = `INSERT INTO AGENCIA (CODIGOBANCO, NUMEROAGENCIA, DIGITOAGENCIA, NOMEAGENCIA, CODIGOAGENCIABANC) VALUES ('${banco}', '${agencia}', '${digito}', 'Importação Sigra', '${seq}')`

  console.log(sql)

  return new Promise((resolve, reject) => {
    
    firebird.attach(options, function (err: any, db: any): any {
      
      if (err) {
        
        console.error('Erro na Conexão: ', err)
        reject(err)
      }
      
      db.query(sql, function (err: any, result: any): any {
        
        if (err) {
          console.error('Erro na Query: ', err)
          reject(err)
        } else {
          
          resolve(result)
        }
        db.detach()
      })
    })
  })
}
export function query_cadastra_conta(codigo: any, banco: any, agencia: any, conta: any, digito: any) {

  console.log('Função Acionada: query_cadastra_conta')

  const sql = `INSERT INTO CONTABANCARIA (CODIGOCONTABANCARIA, CODIGOBANCO, NUMEROAGENCIA, NUMEROCONTA, DIGITOCONTA) VALUES ('${codigo}', '${banco}', '${agencia}', '${conta}', '${digito}')`

  console.log(sql)

  return new Promise((resolve, reject) => {
    
    firebird.attach(options, function (err: any, db: any): any {
      
      if (err) {
        
        console.error('Erro na Conexão: ', err)
        reject(err)
      }
      
      db.query(sql, function (err: any, result: any): any {
        
        if (err) {
          console.error('Erro na Query: ', err)
          reject(err)
        } else {
          
          resolve(result)
        }
        db.detach()
      })
    })
  })
}
export function query_vincula_empresa(seq: any, conta: any, empresa: any) {

  console.log('Função Acionada: query_vincula_empresa')

  const sql = `INSERT INTO CONTABANCARIAEMPRESA (SEQ, CODIGOCONTABANCARIA, CODIGOEMPRESA) VALUES ('${seq}', '${conta}', '${empresa}')`

  console.log(sql)

  return new Promise((resolve, reject) => {
    
    firebird.attach(options, function (err: any, db: any): any {
      
      if (err) {
        
        console.error('Erro na Conexão: ', err)
        reject(err)
      }
      
      db.query(sql, function (err: any, result: any): any {
        
        if (err) {
          console.error('Erro na Query: ', err)
          reject(err)
        } else {
          
          resolve(result)
        }
        db.detach()
      })
    })
  })
}
