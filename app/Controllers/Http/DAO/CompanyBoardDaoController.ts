/* eslint-disable @typescript-eslint/naming-convention */
import Database from '@ioc:Adonis/Lucid/Database'
import Resources from 'App/Models/resource.interface'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import DaoMongoController from './DaoMongoController'

export default class CompanyBoardDaoController extends DaoMongoController {
  protected tableName = 'company_boards'

  // public async store(fields: any) {
  //   const { company_id, company_user_created_id, title, description } = fields

  //   const params = {
  //     company_id,
  //     company_user_created_id,
  //     company_user_updated_id: company_user_created_id,
  //     title,
  //     description,
  //     created_at: format(new Date(), 'yyyy-MM-dd HH:mm:ss', { locale: ptBR }),
  //     updated_at: format(new Date(), 'yyyy-MM-dd HH:mm:ss', { locale: ptBR }),
  //   }

  //   try {
  //     const collection = await this.collection(this.tableName)
  //     const result = await collection.insertOne(params)
  //     return result.insertedId
  //     // const transactionId = await Database.table(this.tableName).returning('id').insert(params)
  //     // return transactionId
  //   } catch (e) {
  //     console.log('> Erro: ', e)
  //     return null
  //   }
  // }

  // public async update(id: number, fields: any) {
  //   try {
  //     const { company_user_updated_id, title, description } = fields
  //     const filter = { _id: id }
  //     const updateDocument = {
  //       company_user_updated_id,
  //       title,
  //       description,
  //       updated_at: format(new Date(), 'yyyy-MM-dd HH:mm:ss', { locale: ptBR }),
  //     }

  //     const collection = await this.collection(this.tableName)
  //     const result = await collection.updateOne(filter, updateDocument)
  //     return result.modifiedCount
  //     // const affected = await Database.from(this.tableName).where('id', id).update(params, 'id')
  //     // return affected.length
  //   } catch (e) {
  //     console.log('> Erro: ', e)
  //     return null
  //   }
  // }

  // public async destroy(id: number, fields: any) {
  //   const { status } = fields

  //   const params = {
  //     status,
  //     updated_at: format(new Date(), 'yyyy-MM-dd HH:mm:ss', { locale: ptBR }),
  //   }

  //   try {
  //     const affected = await Database.from(this.tableName).where('id', id).update(params, 'id')
  //     return affected.length
  //   } catch (e) {
  //     console.log('> Erro: ', e)
  //     return null
  //   }
  // }

  // public async index(id: any, company_id: number) {
  //   const params = {}

  //   if (id && id !== 0) params['_id'] = id
  //   params['company_id'] = company_id

  //   const collection = await this.collection(this.tableName)
  //   const result = await collection.find(params)
  //   return { list: result, counted: result.count() }
  //   // return await Database.from(this.tableName).where(params)
  // }

  // public async counted(id = 0, company_id: number) {
  //   const params = {}

  //   if (id !== 0) params['id'] = id
  //   params['company_id'] = company_id

  //   return Database.from(this.tableName).where(params).count('*')
  // }

  // public async show(id: any, email = '') {
  //   const params = {}

  //   if (id && id !== 0) params['_id'] = id
  //   if (email !== '') params['email'] = email

  //   const collection = await this.collection(this.tableName)
  //   const result = await collection.findOne(params)
  //   return result && result !== undefined ? result : null

  //   // const row: any[] = await Database.from(this.tableName).where(params)
  //   // return row.length ? row[0] : null
  // }
}
