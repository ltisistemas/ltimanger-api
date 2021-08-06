import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import * as bcrypt from 'bcrypt'

export default class InitialSeeder extends BaseSeeder {
  public async run() {
    const { default: UserDaoController } = await import(
      'App/Controllers/Http/DAO/UserDaoController'
    )

    const { default: ConfigurationDaoController } = await import(
      'App/Controllers/Http/DAO/ConfigurationDaoController'
    )

    const name = 'Luiz Felipe Marinho Dantas'
    const email = 'luizltisistemas@gmail.com'
    const pass = 'awAwr@2018'
    const profile = 'ADMIN'

    const salt = bcrypt.genSaltSync(10)
    const password = bcrypt.hashSync(pass, salt)

    const dao = new UserDaoController()
    await dao.store({ name, email, password, profile })

    const daoConfig = new ConfigurationDaoController()
    await daoConfig.store({ status: 'ACTIVE' })
  }
}
