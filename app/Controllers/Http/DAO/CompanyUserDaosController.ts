/* eslint-disable @typescript-eslint/naming-convention */
import Database from '@ioc:Adonis/Lucid/Database'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import * as bcrypt from 'bcrypt'

export default class CompanyUserDaosController {
  protected tableName = 'company_users'

  public async store(fields: any) {
    const salt = bcrypt.genSaltSync(10)

    const {
      company_id,
      contract_number,
      contract_start_date,
      contract_finish_date,
      contract_type,
      name,
      email,
      cpf,
      password: pass,
      profile,
    } = fields

    const params = {
      company_id,
      name,
      email,
      cpf,
      password: bcrypt.hashSync(pass, salt),
      profile,
      created_at: format(new Date(), 'yyyy-MM-dd HH:mm:ss', { locale: ptBR }),
      updated_at: format(new Date(), 'yyyy-MM-dd HH:mm:ss', { locale: ptBR }),
    }

    if (contract_number !== '') params['contract_number'] = fields.contract_number
    if (contract_start_date !== '') params['contract_start_date'] = fields.contract_start_date
    if (contract_finish_date !== '') params['contract_finish_date'] = fields.contract_finish_date
    if (contract_type !== '') params['contract_type'] = fields.contract_type

    try {
      const userId = await Database.table(this.tableName).returning('id').insert(params)
      return userId
    } catch (e) {
      console.log('> Erro: ', e)
      return null
    }
  }

  public async update(id: number, fields: any) {
    const {
      company_id,
      contract_number,
      contract_start_date,
      contract_finish_date,
      contract_type,
      name,
      email,
      cpf,
      password,
      profile,
      reset_token,
    } = fields

    const params = {
      company_id,
      contract_number,
      contract_start_date,
      contract_finish_date,
      contract_type,
      name,
      email,
      cpf,
      password,
      profile,
      reset_token,
      updated_at: format(new Date(), 'yyyy-MM-dd HH:mm:ss', { locale: ptBR }),
    }

    try {
      const affected = await Database.from(this.tableName).where('id', id).update(params, 'id')
      return affected.length
    } catch (e) {
      console.log('> Erro: ', e)
      return null
    }
  }

  public async destroy(id: number, fields: any) {
    const { status } = fields

    const params = {
      status,
      updated_at: format(new Date(), 'yyyy-MM-dd HH:mm:ss', { locale: ptBR }),
    }

    try {
      const affected = await Database.from(this.tableName).where('id', id).update(params, 'id')
      return affected.length
    } catch (e) {
      console.log('> Erro: ', e)
      return null
    }
  }

  public async index(id = 0, company_id: number) {
    const params = {}

    if (id !== 0) params['id'] = id
    params['company_id'] = company_id
    // if (email_exact !== '') params['email'] = email_exact
    // if (email !== '') params['email'] = email

    return await Database.from(this.tableName).where(params)
  }

  public async counted(id = 0, company_id: number) {
    const params = {}

    if (id !== 0) params['id'] = id
    params['company_id'] = company_id

    return Database.from(this.tableName).where(params).count('*')
  }

  public async show(id = 0, email = '') {
    const params = {}

    if (id !== 0) params['id'] = id
    // if (email_exact !== '') params['email'] = email_exact
    if (email !== '') params['email'] = email

    const row: any[] = await Database.from(this.tableName).where(params)
    return row.length ? row[0] : null
  }
}
