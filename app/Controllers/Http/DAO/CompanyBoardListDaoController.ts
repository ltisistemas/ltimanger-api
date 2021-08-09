/* eslint-disable @typescript-eslint/naming-convention */
import Database from '@ioc:Adonis/Lucid/Database'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export default class CompanyBoardListDaoController {
  protected tableName = 'company_lists'

  public async store(fields: any) {
    const { company_board_id, company_user_created_id, title } = fields

    const params = {
      company_board_id,
      company_user_created_id,
      company_user_updated_id: company_user_created_id,
      title,
      created_at: format(new Date(), 'yyyy-MM-dd HH:mm:ss', { locale: ptBR }),
      updated_at: format(new Date(), 'yyyy-MM-dd HH:mm:ss', { locale: ptBR }),
    }

    try {
      const transactionId = await Database.table(this.tableName).returning('id').insert(params)
      return transactionId
    } catch (e) {
      console.log('> Erro: ', e)
      return null
    }
  }

  public async update(id: number, fields: any) {
    const { company_user_updated_id, title } = fields

    const params = {
      company_user_updated_id,
      title,
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

  public async index(id = 0, company_board_id = 0, title = '') {
    const params = {}

    if (id !== 0) params['id'] = id
    if (company_board_id !== 0) params['company_board_id'] = company_board_id
    if (title !== '') params['title'] = title

    return await Database.from(this.tableName).where(params)
  }

  public async counted(id = 0, company_board_id = 0, title = '') {
    const params = {}

    if (id !== 0) params['id'] = id
    if (company_board_id !== 0) params['company_board_id'] = company_board_id
    if (title !== '') params['title'] = title

    return Database.from(this.tableName).where(params).count('*')
  }

  public async show(id = 0, email = '') {
    const params = {}

    if (id !== 0) params['id'] = id
    if (email !== '') params['email'] = email

    const row: any[] = await Database.from(this.tableName).where(params)
    return row.length ? row[0] : null
  }
}
