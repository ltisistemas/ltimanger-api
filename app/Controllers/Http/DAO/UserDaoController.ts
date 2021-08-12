import DaoMongoController from './DaoMongoController'

export default class UserDaoController extends DaoMongoController {
  protected tableName = 'users'

  public async index(fields: any) {
    const params = {}

    if (fields.id || (fields.id !== undefined && fields.id !== 0))
      params['_id'] = this.toId(fields.id)

    return await this.getDocuments(this.tableName, params)
  }

  public async store(fields: any) {
    try {
      const { name, email, password, profile } = fields
      const params = {
        name,
        email,
        password,
        profile,
        created_at: this.toDateTime(),
        updated_at: this.toDateTime(),
      }

      return await this.insertDocument(this.tableName, params)
    } catch (e) {
      console.log('> Erro: ', e)
      return null
    }
  }

  public async show(id: any, email_exact: any = '', email: any = '') {
    const params = {}

    if (id && id !== 0) params['_id'] = id
    if (email_exact && email_exact !== '') params['email'] = email_exact
    if (email && email !== '') params['email'] = email

    return this.getDocument(this.tableName, params)
  }
}
