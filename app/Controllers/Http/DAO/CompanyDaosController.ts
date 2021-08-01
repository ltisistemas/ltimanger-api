/* eslint-disable @typescript-eslint/naming-convention */
import Database from '@ioc:Adonis/Lucid/Database'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export default class CompanyDaosController {
  protected tableName = 'companys'

  public async store(fields: any) {
    const {
      alias,
      razao,
      fantasia,
      cnpj_cpf,
      zipcode,
      street,
      number,
      complement,
      neighborhood,
      city_code,
      city_name,
      state_uf,
      state_code,
      state_name,
      incricao_estadual,
      incricao_municipal,
    } = fields

    const params = {
      alias,
      razao,
      fantasia,
      cnpj_cpf,
      zipcode,
      street,
      number,
      complement,
      neighborhood,
      city_code,
      city_name,
      state_uf,
      state_code,
      state_name,
      incricao_estadual,
      incricao_municipal,
      created_at: format(new Date(), 'yyyy-MM-dd HH:mm:ss', { locale: ptBR }),
      updated_at: format(new Date(), 'yyyy-MM-dd HH:mm:ss', { locale: ptBR }),
    }

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
      alias,
      razao,
      fantasia,
      cnpj_cpf,
      zipcode,
      street,
      number,
      complement,
      neighborhood,
      city_code,
      city_name,
      state_uf,
      state_code,
      state_name,
      incricao_estadual,
      incricao_municipal,
    } = fields

    const params = {
      alias,
      razao,
      fantasia,
      cnpj_cpf,
      zipcode,
      street,
      number,
      complement,
      neighborhood,
      city_code,
      city_name,
      state_uf,
      state_code,
      state_name,
      incricao_estadual,
      incricao_municipal,
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

  public async index(id = 0) {
    const params = {}

    if (id !== 0) params['id'] = id
    // if (email_exact !== '') params['email'] = email_exact
    // if (email !== '') params['email'] = email

    return await Database.from(this.tableName).where(params)
  }

  public async counted(id = 0) {
    const params = {}

    if (id !== 0) params['id'] = id

    return Database.from(this.tableName).where(params).count('*')
  }

  public async show(id = 0) {
    const params = {}

    if (id !== 0) params['id'] = id
    // if (email_exact !== '') params['email'] = email_exact
    // if (email !== '') params['email'] = email

    const row: any[] = await Database.from(this.tableName).where(params)
    return row.length ? row[0] : null
  }
}
