import { MongoClient } from 'mongodb'
import Env from '@ioc:Adonis/Core/Env'
import * as mongo from 'mongodb'
import GlobalDaoController from './GlobalDaoController'

export default class DaoMongoController extends GlobalDaoController {
  protected client: MongoClient

  constructor() {
    super()
    this.client = new MongoClient(Env.get('MONGODB_URL'))
  }

  public async collection(name: string) {
    await this.connect()

    const database = this.client.db('ltimananger')
    return database.collection(name)
  }

  public async connect() {
    await this.client.connect()
  }
  public async close() {
    await this.client.close()
  }
  public toId(id: any) {
    return new mongo.ObjectId(id)
  }
  public async getDocuments(tableName: string, params: any) {
    const collection = await this.collection(tableName)
    const result = collection.find(params)
    return { list: await result.toArray(), counted: await result.count() }
  }
  public async getDocument(tableName: string, params = {}) {
    const collection = await this.collection(tableName)
    const document = collection.findOne(params)
    const doc = await document
    return doc && doc !== undefined ? doc : null
  }
  public async insertDocument(tableName: string, params = {}) {
    const collection = await this.collection(tableName)
    const result = await collection.insertOne(params)
    return result.insertedId
  }
  public async updateDocument(tableName: string, filter = {}, updateDocument = {}) {
    const collection = await this.collection(tableName)
    const result = await collection.updateOne(filter, updateDocument)
    return result.modifiedCount
  }
}
