/* eslint-disable @typescript-eslint/naming-convention */
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CompaniesController {
  protected tableName = 'companys'

  public async index({ request: req, response: res }: HttpContextContract) {
    const { default: CompanyDaosController } = await import(
      'App/Controllers/Http/DAO/CompanyDaoController'
    )

    // const { id } = req.body()
    const { id } = req.qs()

    const dao = new CompanyDaosController()
    const list = await dao.index(id)
    const qtd = (await dao.counted(id))[0].count

    return res.json({
      status: 'success',
      message: 'Operation success',
      code: 200,
      totalCount: qtd,
      summary: [15],
      data: list,
      v: req.qs(),
    })
  }
  public async store({ request: req, response: res }: HttpContextContract) {
    const { default: CompanyDaosController } = await import(
      'App/Controllers/Http/DAO/CompanyDaoController'
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
  public async update({ request: req, response: res, params }: HttpContextContract) {
    const { default: CompanyDaosController } = await import(
      'App/Controllers/Http/DAO/CompanyDaoController'
    )

    const { id: codigo } = params
    const id = parseInt(codigo, 10)
    const dao = new CompanyDaosController()
    const finded = await dao.show(id)
    if (!finded) {
      return res.status(400).json({
        status: 'error',
        message: 'Company not found',
        data: [],
        code: 404,
      })
    }

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

    const affectedRows = await dao.update(id, {
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

    if (!affectedRows) {
      return res.status(400).json({
        status: 'error',
        message: 'Operação não realizda',
        data: affectedRows,
        code: 400,
      })
    }

    return res.json({
      status: 'success',
      message: 'Operação realizda com sucesso',
      data: [],
      code: 200,
    })
  }
  public async destroy({ request: req, response: res, params }: HttpContextContract) {
    const { default: CompanyDaosController } = await import(
      'App/Controllers/Http/DAO/CompanyDaoController'
    )

    const { id: codigo } = params
    const id = parseInt(codigo, 10)
    const dao = new CompanyDaosController()
    const finded = await dao.show(id)
    if (!finded) {
      return res.status(400).json({
        status: 'error',
        message: 'Company not found',
        data: [],
        code: 404,
      })
    }

    const { status } = req.body()

    const affectedRows = await dao.destroy(id, { status })

    if (!affectedRows) {
      return res.status(400).json({
        status: 'error',
        message: 'Operação não realizda',
        data: affectedRows,
        code: 400,
      })
    }

    return res.json({
      status: 'success',
      message: 'Operação realizda com sucesso',
      data: [],
      code: 200,
    })
  }
}
