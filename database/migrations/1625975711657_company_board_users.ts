import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CompanyLists extends BaseSchema {
  protected tableName = 'company_board_users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.bigInteger('company_board_id').unsigned().references('id').inTable('company_boards')
      table.bigInteger('company_user_id').unsigned().references('id').inTable('company_users')
      table
        .bigInteger('company_user_created_id')
        .unsigned()
        .references('id')
        .inTable('company_users')
      table
        .bigInteger('company_user_updated_id')
        .unsigned()
        .references('id')
        .inTable('company_users')

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
