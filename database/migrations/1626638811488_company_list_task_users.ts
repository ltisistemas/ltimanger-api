import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CompanyListTaskUsers extends BaseSchema {
  protected tableName = 'company_list_task_users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.bigInteger('company_user_id').unsigned()
      table.bigInteger('company_list_task_id').unsigned()

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
