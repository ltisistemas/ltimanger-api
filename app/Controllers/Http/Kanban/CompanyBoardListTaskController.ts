/* eslint-disable @typescript-eslint/naming-convention */
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CompanyBoardListTaskController {
  public async index({ request: req, response: res }: HttpContextContract) {
    const { default: CompanyBoardListTaskDaoController } = await import(
      'App/Controllers/Http/DAO/CompanyBoardListTaskDaoController'
    )

    try {
      const id = req.qs().hasOwnProperty('id') ? req.qs().id : 0
      const title = req.qs().hasOwnProperty('title') ? req.qs().title : ''
      const company_list_id = req.qs().hasOwnProperty('company_list_id')
        ? req.qs().company_list_id
        : 0

      const dao = new CompanyBoardListTaskDaoController()
      const { list, counted: qtd } = await dao.index(id, company_list_id, title)

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
    const { request: req, response: res, user } = ctx
    const { default: CompanyBoardListTaskDaoController } = await import(
      'App/Controllers/Http/DAO/CompanyBoardListTaskDaoController'
    )
    const { default: CompanyBoardListTaskHistoryDaoController } = await import(
      'App/Controllers/Http/DAO/CompanyBoardListTaskHistoryDaoController'
    )

    try {
      const { company_list_id, title, description } = req.body()
      const company_user_created_id = user._id
      const dao = new CompanyBoardListTaskDaoController()
      const idTransaction = await dao.store({
        company_list_id,
        company_user_created_id,
        title,
        description,
      })

      const daoHistory = new CompanyBoardListTaskHistoryDaoController()
      await daoHistory.store({ company_user_id: user._id, company_list_tasks_id: idTransaction })

      const finded = await dao.show(idTransaction)
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
    const { default: CompanyBoardListTaskDaoController } = await import(
      'App/Controllers/Http/DAO/CompanyBoardListTaskDaoController'
    )
    const { id: codigo } = params
    const id = parseInt(codigo, 10)
    const dao = new CompanyBoardListTaskDaoController()

    const finded = await dao.show(id)
    if (!finded) {
      return res.status(400).json({
        status: 'error',
        message: 'Task not found',
        data: [],
        code: 404,
      })
    }

    const { title, description } = req.body()

    const affectedRows = await dao.update(id, { title, description })
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
  // public async destroy({ request: req, response: res, params }: HttpContextContract) {
  //   // const { default: CompanyDaosController } = await import(
  //   //   'App/Controllers/Http/DAO/CompanyDaosController'
  //   // )
  //   // const { id: codigo } = params
  //   // const id = parseInt(codigo, 10)
  //   // const dao = new CompanyDaosController()
  //   // const finded = await dao.show(id)
  //   // if (!finded) {
  //   //   return res.status(400).json({
  //   //     status: 'error',
  //   //     message: 'Company not found',
  //   //     data: [],
  //   //     code: 404,
  //   //   })
  //   // }
  //   // const { status } = req.body()
  //   // const affectedRows = await dao.destroy(id, { status })
  //   // if (!affectedRows) {
  //   //   return res.status(400).json({
  //   //     status: 'error',
  //   //     message: 'Operação não realizda',
  //   //     data: affectedRows,
  //   //     code: 400,
  //   //   })
  //   // }
  //   // return res.json({
  //   //   status: 'success',
  //   //   message: 'Operação realizda com sucesso',
  //   //   data: [],
  //   //   code: 200,
  //   // })
  // }
}
