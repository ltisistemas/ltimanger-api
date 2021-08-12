/* eslint-disable @typescript-eslint/naming-convention */
import DaoMongoController from './DaoMongoController'

export default class CompanyBoardListDaoController extends DaoMongoController {
  protected tableName = 'company_lists'

  public async store(fields: any) {
    try {
      const { company_board_id, company_user_created_id, title } = fields

      const params = {
        company_board_id,
        company_user_created_id: this.toId(company_user_created_id),
        company_user_updated_id: this.toId(company_user_created_id),
        title,
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
      const { company_user_updated_id, title } = fields

      const filter = { _id: this.toId(id) }
      const params = {
        company_user_updated_id: this.toId(company_user_updated_id),
        title,
        updated_at: this.toDateTime(),
      }

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

  public async index(id: any, company_board_id: any, title: any = '') {
    const params = {}

    if (id || (id !== undefined && id !== 0)) params['_id'] = this.toId(id)
    params['company_board_id'] = this.toId(company_board_id)
    if (title && title !== '') params['title'] = title

    return await this.getDocuments(this.tableName, params)
  }

  public async show(id: any, company_board_id: any = null, title: any = '') {
    const params = {}

    if (id || (id !== undefined && id !== 0)) params['_id'] = this.toId(id)
    if (company_board_id && company_board_id !== 0)
      params['company_board_id'] = this.toId(company_board_id)
    if (title && title !== '') params['title'] = title

    return await this.getDocument(this.tableName, params)
  }
}
