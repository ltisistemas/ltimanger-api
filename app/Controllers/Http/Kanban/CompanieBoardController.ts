/* eslint-disable @typescript-eslint/naming-convention */
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CompanieBoardController {
  protected tableName = 'companys'

  public async index({ request: req, response: res }: HttpContextContract) {
    const { default: CompanyBoardDaoController } = await import(
      'App/Controllers/Http/DAO/CompanyBoardDaoController'
    )

    const { id, company_id } = req.qs()

    const dao = new CompanyBoardDaoController()
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
  public async store(ctx: HttpContextContract) {
    const { request: req, response: res, user } = ctx

    const { default: CompanyBoardDaoController } = await import(
      'App/Controllers/Http/DAO/CompanyBoardDaoController'
    )
    const { default: CompanyBoardListDaoController } = await import(
      'App/Controllers/Http/DAO/CompanyBoardListDaoController'
    )
    const { default: ConfigurationDaoController } = await import(
      'App/Controllers/Http/DAO/ConfigurationDaoController'
    )

    try {
      const { company_id: companyId, title, description } = req.body()
      const company_user_created_id = parseInt(user.id, 10)
      const company_id = parseInt(companyId, 10)

      const dao = new CompanyBoardDaoController()
      const idTransaction = await dao.store({
        company_id,
        company_user_created_id,
        title,
        description,
      })

      const finded = await dao.show(idTransaction)
      if (finded) {
        const daoConfig = new ConfigurationDaoController()
        const listConfig = await daoConfig.index()
        const config = listConfig[0]
        const lists: any[] = config.default_list.split('|')
        lists.map(async (title: any) => {
          const daoList = new CompanyBoardListDaoController()
          await daoList.store({ company_board_id: idTransaction, company_user_created_id, title })
        })
      }

      return res.json({
        status: 'success',
        message: 'Operation success',
        data: finded,
        code: 200,
      })
    } catch (error) {
      console.log('> Error: ', error)
      return res.status(400).json({
        status: 'error',
        message: 'Operation fail',
        data: error,
        code: 400,
      })
    }
  }
  public async update({ request: req, response: res, params }: HttpContextContract) {
    const { default: CompanyDaoController } = await import(
      'App/Controllers/Http/DAO/CompanyDaoController'
    )

    const { id: codigo } = params
    const id = parseInt(codigo, 10)
    const dao = new CompanyDaoController()
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
    const { default: CompanyDaoController } = await import(
      'App/Controllers/Http/DAO/CompanyDaoController'
    )

    const { id: codigo } = params
    const id = parseInt(codigo, 10)
    const dao = new CompanyDaoController()
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
