/* eslint-disable @typescript-eslint/naming-convention */
import DaoMongoController from './DaoMongoController'

export default class ConfigurationDaoController extends DaoMongoController {
  protected tableName = 'configurations'

  public async store(fields: any) {
    try {
      const {
        status,
        default_list,
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
        status,
        default_list,
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
      const {
        status,
        default_list,
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

      const filter = { _id: id }
      const updateDocument = {
        $set: {
          status,
          default_list,
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
          updated_at: this.toDateTime(),
        },
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

  public async index(id: any) {
    const params = {}

    if (id || id !== undefined) params['_id'] = this.toId(id)

    return await this.getDocuments(this.tableName, params)
  }

  public async show(id: any) {
    const params = {}

    if (id || id !== undefined) params['_id'] = this.toId(id)

    return this.getDocument(this.tableName, params)
  }
}
