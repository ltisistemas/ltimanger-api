import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import * as Jwt from 'jsonwebtoken'
import { jwtKey } from 'Config/app'

export default class Auth {
  public async handle(ctx: HttpContextContract, next: () => Promise<void>) {
    const { request: req, response: res } = ctx

    try {
      const { default: UserDaoController } = await import(
        'App/Controllers/Http/DAO/UserDaoController'
      )
      const dao = new UserDaoController()

      const authorization = String(req.headers().authorization)

      if (!authorization.length) {
        return res.status(401).json({ status: 'error', message: 'Token is required' })
      }

      const token = authorization.split(' ')[1]
      if (!token.length) {
        return res.status(401).json({ status: 'error', message: 'Token not found' })
      }

      const locations = {
        ip: req.ip(),
      }
      const payload: any = Object.assign(locations, Jwt.verify(token, jwtKey))

      const { default: UserAuthController } = await import(
        'App/Controllers/Http/Auth/UserAuthController'
      )

      const daoUserAuth = new UserAuthController()

      const user = await daoUserAuth.authUser(payload.sub)
      if (!user) {
        return res.status(401).json({ status: 'error', message: 'Token invalid' })
      }

      ctx.user = user
      await next()
    } catch (e) {
      console.log('> ', e)
      return res.status(401).json({ status: 'error', message: 'Auth invalid error' })
    }
  }
}
