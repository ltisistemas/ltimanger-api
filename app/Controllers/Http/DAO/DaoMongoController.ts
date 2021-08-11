import { MongoClient } from 'mongodb'
import Env from '@ioc:Adonis/Core/Env'

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
}
