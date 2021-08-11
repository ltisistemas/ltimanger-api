import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Controller from 'App/Controllers/Http/Controller'
import * as bcrypt from 'bcrypt'

export default class UsersController extends Controller {
  protected tableName = 'users'

  public async store({ request: req, response: res }: HttpContextContract) {
    const { default: UserDaoController } = await import(
      'App/Controllers/Http/DAO/UserDaoController'
    )

    const { name, email, password: pass, profile } = req.body()
    const dao = new UserDaoController()

    const check = await dao.show(0, email)
    if (check) {
      return res.status(400).json({
        status: 'error',
        message: 'email has exists',
        data: [],
        code: 400,
      })
    }

    const salt = bcrypt.genSaltSync(10)
    const password = bcrypt.hashSync(pass, salt) // await Hash.make(pass)
    const idTransaction = await dao.store({ name, email, password, profile })

    const user = await dao.show(idTransaction)
    if (user) delete user.password

    return res.json({
      status: 'success',
      message: 'User created successly',
      data: user,
      code: 200,
    })
  }
}
