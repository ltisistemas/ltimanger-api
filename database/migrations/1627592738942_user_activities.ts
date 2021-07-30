import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserActivities extends BaseSchema {
  protected tableName = 'user_activities'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.bigInteger('company_user_id').unsigned().references('id').inTable('company_users')
      table.timestamp('activity_date', { useTz: true })
      table.string('start_hour')
      table.string('finish_hour')
      table.text('notes').nullable()
      table.enum('status', ['APPROVED', 'DISAPPROVED', 'PENDING']).defaultTo('PENDING').nullable()

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
