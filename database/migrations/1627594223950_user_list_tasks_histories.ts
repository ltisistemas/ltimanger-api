import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserListTasksHistories extends BaseSchema {
  protected tableName = 'user_list_tasks_histories'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.bigInteger('company_user_id').unsigned().references('id').inTable('company_users')
      table
        .bigInteger('company_list_tasks_id')
        .unsigned()
        .references('id')
        .inTable('company_list_tasks')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
