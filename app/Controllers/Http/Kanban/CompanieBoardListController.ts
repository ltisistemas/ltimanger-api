/* eslint-disable @typescript-eslint/naming-convention */
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CompanieBoardListController {
  public async index({ request: req, response: res }: HttpContextContract) {
    const { default: CompanyBoardListDaoController } = await import(
      'App/Controllers/Http/DAO/CompanyBoardListDaoController'
    )

    try {
      const id = req.qs().hasOwnProperty('id') ? req.qs().id : 0
      const title = req.qs().hasOwnProperty('title') ? req.qs().title : ''
      const company_board_id = req.qs().hasOwnProperty('company_board_id')
        ? req.qs().company_board_id
        : 0

      const dao = new CompanyBoardListDaoController()
      const list = await dao.index(id, company_board_id, title)
      const qtd = (await dao.counted(id, company_board_id, title))[0].count

      return res.json({
        status: 'success',
        message: 'Operation success',
        code: 200,
        totalCount: qtd,
        summary: [15],
        data: list,
        v: req.qs(),
      })
    } catch (error) {
      console.log('> ', error)

      return res.status(400).json({
        status: 'error',
        message: 'Operation not success',
        code: 400,
        totalCount: 0,
        summary: [15],
        data: error,
        v: req.qs(),
      })
    }
  }
  public async store(ctx: HttpContextContract) {
    // const { request: req, response: res, user } = ctx
    // const { default: CompanyBoardListDaoController } = await import(
    //   'App/Controllers/Http/DAO/CompanyBoardListDaoController'
    // )
    // const { default: ConfigurationDaoController } = await import(
    //   'App/Controllers/Http/DAO/ConfigurationDaoController'
    // )
    // try {
    //   const { company_id, title, description } = req.body()
    //   const company_user_created_id = parseInt(user.id, 10)
    //   const companyId = parseInt(company_id, 10)
    //   const dao = new CompanyBoardListDaoController()
    //   const idTransaction = parseInt(
    //     (
    //       await dao.store({
    //         company_id: companyId,
    //         company_user_created_id,
    //         title,
    //         description,
    //       })
    //     )[0],
    //     10
    //   )
    //   const finded = await dao.show(idTransaction)
    //   if (finded) {
    //     const daoConfig = new ConfigurationDaoController()
    //     const listConfig = await daoConfig.index()
    //     const config = listConfig[0]
    //     const lists: any[] = config.default_list.split('|')
    //     lists.map(async (title: any) => {
    //       const daoList = new CompanyBoardListDaoController()
    //       await daoList.store({ company_board_id: idTransaction, company_user_created_id, title })
    //     })
    //   }
    //   return res.json({
    //     status: 'success',
    //     message: 'Operation success',
    //     data: finded,
    //     code: 200,
    //   })
    // } catch (error) {
    //   console.log('> Error: ', error)
    //   return res.status(400).json({
    //     status: 'error',
    //     message: 'Operation fail',
    //     data: error,
    //     code: 400,
    //   })
    // }
  }
  public async update({ request: req, response: res, params }: HttpContextContract) {
    // const { default: CompanyDaosController } = await import(
    //   'App/Controllers/Http/DAO/CompanyDaosController'
    // )
    // const { id: codigo } = params
    // const id = parseInt(codigo, 10)
    // const dao = new CompanyDaosController()
    // const finded = await dao.show(id)
    // if (!finded) {
    //   return res.status(400).json({
    //     status: 'error',
    //     message: 'Company not found',
    //     data: [],
    //     code: 404,
    //   })
    // }
    // const {
    //   alias,
    //   razao,
    //   fantasia,
    //   cnpj_cpf,
    //   zipcode,
    //   street,
    //   number,
    //   complement,
    //   neighborhood,
    //   city_code,
    //   city_name,
    //   state_uf,
    //   state_code,
    //   state_name,
    //   incricao_estadual,
    //   incricao_municipal,
    // } = req.body()
    // const affectedRows = await dao.update(id, {
    //   alias,
    //   razao,
    //   fantasia,
    //   cnpj_cpf,
    //   zipcode,
    //   street,
    //   number,
    //   complement,
    //   neighborhood,
    //   city_code,
    //   city_name,
    //   state_uf,
    //   state_code,
    //   state_name,
    //   incricao_estadual,
    //   incricao_municipal,
    // })
    // if (!affectedRows) {
    //   return res.status(400).json({
    //     status: 'error',
    //     message: 'Operação não realizda',
    //     data: affectedRows,
    //     code: 400,
    //   })
    // }
    // return res.json({
    //   status: 'success',
    //   message: 'Operação realizda com sucesso',
    //   data: [],
    //   code: 200,
    // })
  }
  public async destroy({ request: req, response: res, params }: HttpContextContract) {
    // const { default: CompanyDaosController } = await import(
    //   'App/Controllers/Http/DAO/CompanyDaosController'
    // )
    // const { id: codigo } = params
    // const id = parseInt(codigo, 10)
    // const dao = new CompanyDaosController()
    // const finded = await dao.show(id)
    // if (!finded) {
    //   return res.status(400).json({
    //     status: 'error',
    //     message: 'Company not found',
    //     data: [],
    //     code: 404,
    //   })
    // }
    // const { status } = req.body()
    // const affectedRows = await dao.destroy(id, { status })
    // if (!affectedRows) {
    //   return res.status(400).json({
    //     status: 'error',
    //     message: 'Operação não realizda',
    //     data: affectedRows,
    //     code: 400,
    //   })
    // }
    // return res.json({
    //   status: 'success',
    //   message: 'Operação realizda com sucesso',
    //   data: [],
    //   code: 200,
    // })
  }
}
