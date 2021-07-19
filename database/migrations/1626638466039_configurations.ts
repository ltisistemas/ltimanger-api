import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Configurations extends BaseSchema {
  protected tableName = 'configurations'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.enum('status', ['ACTIVE', 'INATIVE']).defaultTo('ACTIVE').nullable()
      table.string('default_list').defaultTo('BACKLOG|TO DO|IN PROGRESS|REVIEW / QA|DONE').nullable()
      table.string('razao').nullable()
      table.string('fantasia').nullable()
      table.string('cnpj_cpf').nullable()
      table.string('zipcode').nullable()
      table.string('street').nullable()
      table.string('number').nullable()
      table.string('complement').nullable()
      table.string('neighborhood').nullable()
      table.string('city_code').nullable()
      table.string('city_name').nullable()
      table.string('state_uf').nullable()
      table.string('state_code').nullable()
      table.string('state_name').nullable()
      table.string('incricao_estadual').nullable()
      table.string('incricao_municipal').nullable()

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
