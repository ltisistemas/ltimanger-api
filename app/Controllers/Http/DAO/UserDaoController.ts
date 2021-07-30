import Database from '@ioc:Adonis/Lucid/Database'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

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
    const { name, email, password, profile } = fields

    const params = {
      name,
      email,
      password,
      profile,
      created_at: format(new Date(), 'yyyy-MM-dd HH:mm:ss', { locale: ptBR }),
      updated_at: format(new Date(), 'yyyy-MM-dd HH:mm:ss', { locale: ptBR }),
    }

    try {
      const userId = await Database.table('users').returning('id').insert(params)
      return userId
    } catch (e) {
      console.log('> Erro: ', e)
      return null
    }
  }

  public async show(id = 0, email_exact = '', email = '') {
    const params = {}

    if (id !== 0) params['id'] = id
    if (email_exact !== '') params['email'] = email_exact
    if (email !== '') params['email'] = email

    const row: any[] = await Database.from('users').where(params)
    return row.length ? row[0] : null
  }
}
