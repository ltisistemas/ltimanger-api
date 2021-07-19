import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CompanyBoards extends BaseSchema {
  protected tableName = 'company_boards'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.bigInteger('company_id').unsigned()
      table.bigInteger('company_user_create_id').unsigned()
      table.bigInteger('company_user_updated_id').unsigned()
      table.string('title')
      table.text('description').nullable()

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
