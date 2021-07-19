import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CompanyUserContracts extends BaseSchema {
  protected tableName = 'company_user_contracts'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.bigInteger('company_id').unsigned()
      table.string('contract_number')
      table.timestamp('start_date').nullable()
      table.timestamp('finish_date').nullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
