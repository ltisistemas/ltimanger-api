/* eslint-disable @typescript-eslint/naming-convention */
import DaoMongoController from './DaoMongoController'

export default class CompanyBoardDaoController extends DaoMongoController {
  protected tableName = 'company_boards'

  public async store(fields: any) {
    try {
      const { company_id, company_user_created_id, title, description } = fields

      const params = {
        company_id: this.toId(company_id),
        company_user_created_id: this.toId(company_user_created_id),
        company_user_updated_id: this.toId(company_user_created_id),
        title,
        description,
        created_at: this.toDateTime(),
        updated_at: this.toDateTime(),
      }
      return await this.insertDocument(this.tableName, params)
    } catch (e) {
      console.log('> Erro: ', e)
      return null
    }
  }

  public async update(id: number, fields: any) {
    try {
      const { company_user_updated_id, title, description } = fields
      const filter = { _id: this.toId(id) }
      const updateDocument = {
        company_user_updated_id: this.toId(company_user_updated_id),
        title,
        description,
        updated_at: this.toDateTime(),
      }

      return await this.updateDocument(this.tableName, filter, updateDocument)
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

  public async index(id: any, company_id: number) {
    const params = {}

    if (id || (id !== undefined && id !== 0)) params['_id'] = this.toId(id)
    params['company_id'] = this.toId(company_id)

    return await this.getDocuments(this.tableName, params)
  }

  public async show(id: any, email = '') {
    const params = {}

    if (id || (id !== undefined && id !== 0)) params['_id'] = this.toId(id)
    if (email && email !== '') params['email'] = email

    return await this.getDocument(this.tableName, params)
  }
}
