import firebird from 'node-firebird'
import { options } from '../../../lib/firebird'

export function query_extrato_insert(empresa: any, estab: any, conta_ctb: any, data: any, seq: any, numero: any, tipo: any, valor: any, descricao: any) {

  const sql = `EXECUTE PROCEDURE SIGRA_EXTRATO_INSERT('${empresa}', '${estab}', '${conta_ctb}', '${data}', '${seq}', '${numero}', '${tipo}', '${valor}', '${descricao}')`

  console.log(sql)

  return new Promise((resolve, reject) => {
    console.log('Chegou na Promise')
    firebird.attach(options, function (err: any, db: any): any {
      console.log('Chegou no Attach')
      if (err) {
        console.log('Chegou no Erro do Attach')
        console.error('Erro na Conexão: ', err)
        reject(err)
      }
      console.log('Chegou antes do DbQuery')
      db.query(sql, function (err: any, result: any): any {
        console.log('Chegou no DbQuery')
        if (err) {
          console.error('Erro na Query: ', err)
          reject(err)
        } else {
          console.log('Chegou no Else do DbQuery')
          resolve(result)
        }
        db.detach()
      })
    })
  })
}

export function query_existe_conta_cadastrada(agencia: any, conta: any, digito: any, banco: any) {

  const sql = `select count(*) as QTDE from CONTABANCARIA A WHERE A.CODIGOBANCO = '${banco}' AND A.NUMEROAGENCIA = '${agencia}' AND A.NUMEROCONTA = '${conta}' AND A.DIGITOCONTA = '${digito}'`

  console.log(sql)

  return new Promise((resolve, reject) => {
    console.log('Chegou na Promise')
    firebird.attach(options, function (err: any, db: any): any {
      console.log('Chegou no Attach')
      if (err) {
        console.log('Chegou no Erro do Attach')
        console.error('Erro na Conexão: ', err)
        reject(err)
      }
      console.log('Chegou antes do DbQuery')
      db.query(sql, function (err: any, result: any): any {
        console.log('Chegou no DbQuery')
        if (err) {
          console.error('Erro na Query: ', err)
          reject(err)
        } else {
          console.log('Chegou no Else do DbQuery')
          resolve(result[0].QTDE)
        }
        db.detach()
      })
    })
  })
}
export function query_existe_agencia(agencia: any, banco: any) {

  const sql = `select count(*) as QTDE from AGENCIA A WHERE A.CODIGOBANCO = '${banco}' AND A.NUMEROAGENCIA = '${agencia}' `

  console.log(sql)

  return new Promise((resolve, reject) => {
    console.log('Chegou na Promise')
    firebird.attach(options, function (err: any, db: any): any {
      console.log('Chegou no Attach')
      if (err) {
        console.log('Chegou no Erro do Attach')
        console.error('Erro na Conexão: ', err)
        reject(err)
      }
      console.log('Chegou antes do DbQuery')
      db.query(sql, function (err: any, result: any): any {
        console.log('Chegou no DbQuery')
        if (err) {
          console.error('Erro na Query: ', err)
          reject(err)
        } else {
          console.log('Chegou no Else do DbQuery')
          console.log('Existe Agencia?', result)
          resolve(result[0].QTDE)
        }
        db.detach()
      })
    })
  })
}
export function query_seq_agencia() {

  const sql = `SELECT MAX(CODIGOAGENCIABANC)+1 AS SEQ FROM AGENCIA `

  console.log(sql)

  return new Promise((resolve, reject) => {
    console.log('Chegou na Promise')
    firebird.attach(options, function (err: any, db: any): any {
      console.log('Chegou no Attach')
      if (err) {
        console.log('Chegou no Erro do Attach')
        console.error('Erro na Conexão: ', err)
        reject(err)
      }
      console.log('Chegou antes do DbQuery')
      db.query(sql, function (err: any, result: any): any {
        console.log('Chegou no DbQuery')
        if (err) {
          console.error('Erro na Query: ', err)
          reject(err)
        } else {
          console.log('Chegou no Else do DbQuery')
          console.log(result[0].SEQ)
          resolve(result[0].SEQ)
        }
        db.detach()
      })
    })
  })
}
export function query_seq_conta() {

  const sql = `SELECT MAX(CODIGOCONTABANCARIA)+1 AS SEQ FROM CONTABANCARIA`

  console.log(sql)

  return new Promise((resolve, reject) => {
    console.log('Chegou na Promise')
    firebird.attach(options, function (err: any, db: any): any {
      console.log('Chegou no Attach')
      if (err) {
        console.log('Chegou no Erro do Attach')
        console.error('Erro na Conexão: ', err)
        reject(err)
      }
      console.log('Chegou antes do DbQuery')
      db.query(sql, function (err: any, result: any): any {
        console.log('Chegou no DbQuery')
        if (err) {
          console.error('Erro na Query: ', err)
          reject(err)
        } else {
          console.log('Chegou no Else do DbQuery')
          console.log(result[0].SEQ)
          resolve(result[0].SEQ)
        }
        db.detach()
      })
    })
  })
}
export function query_cadastra_agencia(banco: any, agencia: any, digito: any, seq: any) {

  const sql = `INSERT INTO AGENCIA (CODIGOBANCO, NUMEROAGENCIA, DIGITOAGENCIA, NOMEAGENCIA, CODIGOAGENCIABANC) VALUES ('${banco}', '${agencia}', '${digito}', 'Importação Sigra', '${seq}')`

  console.log(sql)

  return new Promise((resolve, reject) => {
    console.log('Chegou na Promise')
    firebird.attach(options, function (err: any, db: any): any {
      console.log('Chegou no Attach')
      if (err) {
        console.log('Chegou no Erro do Attach')
        console.error('Erro na Conexão: ', err)
        reject(err)
      }
      console.log('Chegou antes do DbQuery')
      db.query(sql, function (err: any, result: any): any {
        console.log('Chegou no DbQuery')
        if (err) {
          console.error('Erro na Query: ', err)
          reject(err)
        } else {
          console.log('Chegou no Else do DbQuery')
          resolve(result)
        }
        db.detach()
      })
    })
  })
}
export function query_cadastra_conta(codigo: any, banco: any, agencia: any, conta: any, digito: any) {

  const sql = `INSERT INTO CONTABANCARIA (CODIGOCONTABANCARIA, CODIGOBANCO, NUMEROAGENCIA, NUMEROCONTA, DIGITOCONTA) VALUES ('${codigo}', '${banco}', '${agencia}', '${conta}', '${digito}')`

  console.log(sql)

  return new Promise((resolve, reject) => {
    console.log('Chegou na Promise')
    firebird.attach(options, function (err: any, db: any): any {
      console.log('Chegou no Attach')
      if (err) {
        console.log('Chegou no Erro do Attach')
        console.error('Erro na Conexão: ', err)
        reject(err)
      }
      console.log('Chegou antes do DbQuery')
      db.query(sql, function (err: any, result: any): any {
        console.log('Chegou no DbQuery')
        if (err) {
          console.error('Erro na Query: ', err)
          reject(err)
        } else {
          console.log('Chegou no Else do DbQuery')
          resolve(result)
        }
        db.detach()
      })
    })
  })
}
