import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hash from '@ioc:Adonis/Core/Hash'
import Controller from 'App/Controllers/Http/Controller'

export default class UsersController extends Controller {
  protected tableName = 'users'

  // public async index ({}: HttpContextContract) {
  // }
  //
  // public async create ({}: HttpContextContract) {
  // }

  public async store({ request: req, response: res }: HttpContextContract) {
    const { default: UserDaoController } = await import(
      'App/Controllers/Http/DAO/UserDaoController'
    )

    const { name, email, password: pass, profile } = req.body()
    const password = await Hash.make(pass)

    const dao = new UserDaoController()
    const idTransaction = await dao.store({ name, email, password, profile })

    const user = await dao.show(idTransaction)
    delete user.senha

    return res.json(user)
  }

  // public async show ({}: HttpContextContract) {
  // }
  //
  // public async edit ({}: HttpContextContract) {
  // }
  //
  // public async update ({}: HttpContextContract) {
  // }
  //
  // public async destroy ({}: HttpContextContract) {
  // }
}
