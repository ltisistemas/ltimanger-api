import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Controller from 'App/Controllers/Http/Controller'

export default class LoginController extends Controller {
  public async store({ request: req, response: res }: HttpContextContract) {
    const { default: UserDaoController } = await import(
      'App/Controllers/Http/DAO/UserDaoController'
    )
    const { default: CompanyUserDaosController } = await import(
      'App/Controllers/Http/DAO/CompanyUserDaosController'
    )
    const { default: UserAuthController } = await import(
      'App/Controllers/Http/Auth/UserAuthController'
    )

    const { email, password } = req.body()
    let dao: any = new UserDaoController()

    const daoUserAuth = new UserAuthController()

    const user = await daoUserAuth.authUser(0, email)
    if (!user) {
      return res.status(401).json({
        status: 'error',
        code: 401,
        message: 'User / Password not found',
        data: {},
      })
    }

    if (!dao.doCompareHash(password, user.password)) {
      return res.status(401).json({
        status: 'error',
        code: 401,
        message: 'User / Password not found',
        data: {},
      })
    }

    delete user.password
    const payload = {
      iat: Math.floor(Date.now() / 1000) - 30,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 12,
      sub: user._id,
    }
    const token = this.jwtEncode(payload)
    user.token = token

    return res.json({
      status: 'success',
      message: 'Loggin success',
      data: user,
      code: 200,
    })
  }

  // public async destroy ({}: HttpContextContract) {
  // }
}
