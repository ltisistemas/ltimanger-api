import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CompanyListTasks extends BaseSchema {
  protected tableName = 'company_list_tasks'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.bigInteger('company_list_id').unsigned().references('company_lists.id')
      table.bigInteger('company_user_create_id').unsigned().references('company_users.id')
      table.bigInteger('company_user_updated_id').unsigned().references('company_users.id')
      table.string('title')
      table.string('description').nullable()

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
