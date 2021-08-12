import { MongoClient } from 'mongodb'
import Env from '@ioc:Adonis/Core/Env'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import * as mongo from 'mongodb'
import * as bcrypt from 'bcrypt'

export default class DaoMongoController {
  protected client: MongoClient

  constructor() {
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
    console.log('< doc', doc, params)
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
  public toHash(hash: string) {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(hash, salt)
  }
  public toDateTime(value: any = null) {
    const entry = value && value !== undefined ? value : new Date()
    return format(entry, 'yyyy-MM-dd HH:mm:ss', { locale: ptBR })
  }
  public doCompareHash(password, hash) {
    return bcrypt.compareSync(password, hash)
  }
}
