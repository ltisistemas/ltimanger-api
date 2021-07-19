import Database from '@ioc:Adonis/Lucid/Database'

export default class UserDaoController {
  // public async qtdTotal(fields: any) {
  //
  // }
  public async index(fields: any) {
    const params = {
      id: fields.id ?? 0,
      name: fields.name ?? '',
      email: fields.email ?? '',
      email_exact: fields.email_exact ?? '',
      password: fields.password ?? '',
      start: fields.start ?? 0,
      limit: fields.limit ?? 15,
    }

    let sql = `CALL sp_usuario_lista(:id, :name, :email, :email_exact, :password, :start, :limit);`

    try {
      return await Database.rawQuery(sql, params)
    } catch (e) {
      console.log('> Erro: ', e)
      return null
    }
  }

  public async store(fields: any) {
    const params = {
      name: fields.name,
      email: fields.email,
      password: fields.password,
      profile: fields.profile,
    }

    let sql = `CALL sp_usuario_inclusao(:name, :email, :profile, :password);`

    try {
      const row: any = await Database.rawQuery(sql, params)
      const result = isNaN(+row[0][0][0].Result_Transaction)
        ? false
        : row[0][0][0].Result_Transaction
      return result
    } catch (e) {
      console.log('> Erro: ', e)
      return null
    }
  }

  public async show(id = 0, email_exact = '', email = '') {
    const row: any[] = await this.index({ id, email_exact, email, start: 0, limit: 1 })
    const result: any[] = row[0][0]
    return result.length ? result[0] : null
  }

  // public async edit({}: HttpContextContract) {}
  //
  // public async update({}: HttpContextContract) {}
  //
  // public async destroy({}: HttpContextContract) {}
}
