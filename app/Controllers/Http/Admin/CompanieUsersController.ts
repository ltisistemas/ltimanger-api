/* eslint-disable @typescript-eslint/naming-convention */
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CompanieUsersController {
  protected tableName = 'companys'

  public async index({ request: req, response: res }: HttpContextContract) {
    const { default: CompanyUserDaosController } = await import(
      'App/Controllers/Http/DAO/CompanyUserDaosController'
    )

    // const { id } = req.body()
    const { id, company_id } = req.qs()

    const dao = new CompanyUserDaosController()
    const list = await dao.index(id, company_id)
    const qtd = (await dao.counted(id, company_id))[0].count

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
    const { default: CompanyUserDaosController } = await import(
      'App/Controllers/Http/DAO/CompanyUserDaosController'
    )

    try {
      const { company_id, name, email, cpf, password, profile } = req.body()

      const contract_number = req.body().hasOwnProperty('contract_number')
        ? req.body().contract_number
        : ''
      const contract_start_date = req.body().hasOwnProperty('contract_start_date')
        ? req.body().contract_start_date
        : ''
      const contract_finish_date = req.body().hasOwnProperty('contract_finish_date')
        ? req.body().contract_finish_date
        : ''
      const contract_type = req.body().hasOwnProperty('contract_type')
        ? req.body().contract_type
        : ''

      const dao = new CompanyUserDaosController()
      const idTransaction = parseInt(
        (
          await dao.store({
            company_id,
            contract_number: contract_number ?? '',
            contract_start_date: contract_start_date ?? '',
            contract_finish_date: contract_finish_date ?? '',
            contract_type: contract_type ?? '',
            name,
            email,
            cpf,
            password,
            profile,
          })
        )[0],
        10
      )

      const company = await dao.show(idTransaction)

      return res.json({
        status: 'success',
        message: 'Company User created successly',
        data: company,
        code: 200,
      })
    } catch (error) {
      console.log('> error', error)
      return res.status(400).json({
        status: 'success',
        message: 'Company User not created',
        data: error,
        code: 400,
      })
    }
  }
  public async update({ request: req, response: res, params }: HttpContextContract) {
    const { default: CompanyUserDaosController } = await import(
      'App/Controllers/Http/DAO/CompanyUserDaosController'
    )

    const { id: codigo } = params
    const id = parseInt(codigo, 10)
    const dao = new CompanyUserDaosController()
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
    } = req.body()

    const affectedRows = await dao.update(id, {
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
    const { default: CompanyUserDaosController } = await import(
      'App/Controllers/Http/DAO/CompanyUserDaosController'
    )

    const { id: codigo } = params
    const id = parseInt(codigo, 10)
    const dao = new CompanyUserDaosController()
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
