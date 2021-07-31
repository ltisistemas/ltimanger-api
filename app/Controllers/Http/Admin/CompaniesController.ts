/* eslint-disable @typescript-eslint/naming-convention */
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Controller from 'App/Controllers/Http/Controller'

export default class CompaniesController {
  protected tableName = 'companys'

  public async index({ request: req, response: res }: HttpContextContract) {
    const { default: CompanyDaosController } = await import(
      'App/Controllers/Http/DAO/CompanyDaosController'
    )

    const { id } = req.body()

    const dao = new CompanyDaosController()
    const list = await dao.index(id)
    const qtd = (await dao.counted(id))[0].count

    return res.json({
      status: 'success',
      message: 'Operation success',
      code: 200,
      totalRecords: qtd,
      data: list,
    })
  }
  public async store({ request: req, response: res }: HttpContextContract) {
    const { default: CompanyDaosController } = await import(
      'App/Controllers/Http/DAO/CompanyDaosController'
    )

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
    } = req.body()

    const dao = new CompanyDaosController()
    const idTransaction = parseInt(
      (
        await dao.store({
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
        })
      )[0],
      10
    )

    const company = await dao.show(idTransaction)

    return res.json({
      status: 'success',
      message: 'Company created successly',
      data: company,
      code: 200,
    })
  }
}
