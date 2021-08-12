/* eslint-disable @typescript-eslint/naming-convention */
import DaoMongoController from './DaoMongoController'

export default class CompanyUserDaosController extends DaoMongoController {
  protected tableName = 'company_users'

  public async store(fields: any) {
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
      company_id: this.toId(company_id),
      name,
      email,
      cpf,
      password: this.toHash(pass),
      profile,
      created_at: this.toDateTime(),
      updated_at: this.toDateTime(),
    }

    if (contract_number !== '') params['contract_number'] = fields.contract_number
    if (contract_start_date !== '') params['contract_start_date'] = fields.contract_start_date
    if (contract_finish_date !== '') params['contract_finish_date'] = fields.contract_finish_date
    if (contract_type !== '') params['contract_type'] = fields.contract_type

    try {
      return await this.insertDocument(this.tableName, params)
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
      updated_at: this.toDateTime(),
    }

    try {
      const filter = { _id: this.toId(id) }
      return await this.updateDocument(this.tableName, filter, params)
    } catch (e) {
      console.log('> Erro: ', e)
      return null
    }
  }

  public async destroy(id: number, fields: any) {
    try {
      const { status, company_user_updated_id } = fields
      const filter = { _id: this.toId(id) }
      const updateDocument = {
        company_user_updated_id: this.toId(company_user_updated_id),
        status,
        updated_at: this.toDateTime(),
      }

      return await this.updateDocument(this.tableName, filter, updateDocument)
    } catch (e) {
      console.log('> Erro: ', e)
      return null
    }
  }

  public async index(id: any, company_id: any) {
    const params = {}

    if (id || (id !== undefined && id !== 0)) params['_id'] = this.toId(id)
    params['company_id'] = this.toId(company_id)

    return await this.getDocuments(this.tableName, params)
  }

  public async show(id: any, email: any = '') {
    const params = {}

    if (id || (id !== undefined && id !== 0)) params['_id'] = this.toId(id)
    if (email && email !== '') params['email'] = email

    return this.getDocument(this.tableName, params)
  }
}
