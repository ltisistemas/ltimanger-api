export default class UserAuthController {
  public async authUser(id: any, email: any = '') {
    const { default: UserDaoController } = await import(
      'App/Controllers/Http/DAO/UserDaoController'
    )
    const { default: CompanyUserDaosController } = await import(
      'App/Controllers/Http/DAO/CompanyUserDaosController'
    )

    let dao: any = new UserDaoController()

    let user = await dao.show(id, email)
    if (!user) {
      dao = new CompanyUserDaosController()
      user = await dao.show(id, email)
    }

    return user
  }
}
