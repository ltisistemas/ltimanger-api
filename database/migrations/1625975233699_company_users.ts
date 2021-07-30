import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CompanyUsers extends BaseSchema {
  protected tableName = 'company_users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.bigInteger('company_id').unsigned().references('id').inTable('companys')
      table.string('contract_number')
      table.timestamp('contract_start_date', { useTz: true })
      table.timestamp('contract_finish_date', { useTz: true })
      table.enum('contract_type', ['PJ', 'CLT', 'FREELA']).defaultTo('PJ').nullable()
      table.string('name')
      table.string('email').unique()
      table.string('cpf').unique()
      table.string('password')
      table.string('reset_token')
      table.enum('profile', ['COMPANY_ADMIN', 'COMPANY_USER']).defaultTo('COMPANY_ADMIN').nullable()
      table.enum('status', ['ACTIVE', 'INACTIVE']).defaultTo('ACTIVE').nullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('last_logged_at', { useTz: true })
      table.timestamp('deleted_at', { useTz: true })
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
