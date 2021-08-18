/* eslint-disable @typescript-eslint/naming-convention */
import DaoMongoController from './DaoMongoController'

export default class CompanyBoardListTaskHistoryDaoController extends DaoMongoController {
  protected tableName = 'company_list_tasks_history'

  public async store(fields: any) {
    try {
      const { company_user_id, company_list_tasks_id, history_type, message } = fields
      const params = {
        company_user_id: this.toId(company_user_id),
        company_list_tasks_id,
        history_type: history_type,
        message,
        created_at: this.toDateTime(),
        updated_at: this.toDateTime(),
      }

      return await this.insertDocument(this.tableName, params)
    } catch (e) {
      console.log('> Erro: ', e)
      return null
    }
  }

  public async index(id: any = 0, company_user_id: any = 0, company_list_tasks_id: any = 0) {
    const params = {}

    if (id || (id !== undefined && id !== 0)) params['_id'] = this.toId(id)
    if (company_user_id || (company_user_id !== undefined && company_user_id !== 0))
      params['company_user_id'] = this.toId(company_user_id)
    if (
      company_list_tasks_id ||
      (company_list_tasks_id !== undefined && company_list_tasks_id !== 0)
    )
      params['company_list_tasks_id'] = this.toId(company_list_tasks_id)

    return await this.getDocuments(this.tableName, params)
  }

  public async show(id: any = 0, company_user_id: any = 0, company_list_tasks_id: any = 0) {
    const params = {}

    if (id || (id !== undefined && id !== 0)) params['_id'] = this.toId(id)
    if (company_user_id || (company_user_id !== undefined && company_user_id !== 0))
      params['company_user_id'] = this.toId(company_user_id)
    if (
      company_list_tasks_id ||
      (company_list_tasks_id !== undefined && company_list_tasks_id !== 0)
    )
      params['company_list_tasks_id'] = this.toId(company_list_tasks_id)

    return await this.getDocument(this.tableName, params)
  }
}
