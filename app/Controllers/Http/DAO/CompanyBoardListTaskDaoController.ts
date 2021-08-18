/* eslint-disable @typescript-eslint/naming-convention */
import DaoMongoController from './DaoMongoController'

export default class CompanyBoardListTaskDaoController extends DaoMongoController {
  protected tableName = 'company_list_tasks'

  public async store(fields: any) {
    try {
      const { company_list_id, company_user_created_id, title, description } = fields
      const params = {
        company_list_id: this.toId(company_list_id),
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
      const { company_user_updated_id, company_list_id, title, description } = fields
      const filter = { _id: this.toId(id) }
      const updateDocument = {
        company_user_updated_id: this.toId(company_user_updated_id),
        updated_at: this.toDateTime(),
      }

      if (fields.hasOwnProperty('company_list_id'))
        updateDocument['company_list_id'] = this.toId(company_list_id)
      if (title && title !== undefined && title !== '') updateDocument['title'] = title
      if (description && description !== undefined && description !== '')
        updateDocument['description'] = description

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

  public async index(id = 0, company_list_id = 0, title = '') {
    const params = {}

    if (id || (id !== undefined && id !== 0)) params['_id'] = this.toId(id)
    params['company_list_id'] = this.toId(company_list_id)
    if (title && title !== '') params['title'] = title

    return await this.getDocuments(this.tableName, params)
  }

  public async show(id: any, company_list_id: any = 0, title = '') {
    const params = {}

    if (id && id !== undefined && id !== 0) params['_id'] = this.toId(id)
    if (company_list_id && company_list_id !== undefined && company_list_id !== 0)
      params['company_list_id'] = this.toId(company_list_id)
    if (title && title !== '') params['title'] = title

    return await this.getDocument(this.tableName, params)
  }
}
