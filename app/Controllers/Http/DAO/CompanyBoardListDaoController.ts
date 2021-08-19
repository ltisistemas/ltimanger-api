/* eslint-disable @typescript-eslint/naming-convention */
import DaoMongoController, { LookupModel } from './DaoMongoController'

export default class CompanyBoardListDaoController extends DaoMongoController {
  protected tableName = 'company_lists'

  public async store(fields: any) {
    try {
      const { company_board_id, company_user_created_id, title } = fields

      const params = {
        company_board_id,
        company_user_created_id: this.toId(company_user_created_id),
        company_user_updated_id: this.toId(company_user_created_id),
        title,
        created_at: this.toDateTime(),
        updated_at: this.toDateTime(),
      }

      return await this.insertDocument(this.tableName, params)
    } catch (e) {
      console.log('> Erro: ', e)
      return null
    }
  }

  public async update(id: number, fields: any) {
    try {
      const { company_user_updated_id, title } = fields

      const filter = { _id: this.toId(id) }
      const params = {
        company_user_updated_id: this.toId(company_user_updated_id),
        title,
        updated_at: this.toDateTime(),
      }

      return await this.updateDocument(this.tableName, filter, params)
    } catch (e) {
      console.log('> Erro: ', e)
      return null
    }
  }

  public async destroy(id: number, fields: any) {
    try {
      const { status, company_user_updated_id } = fields
      const filter = { _id: this.toId(id) }
      const updateDocument = {
        company_user_updated_id: this.toId(company_user_updated_id),
        status,
        updated_at: this.toDateTime(),
      }

      return await this.updateDocument(this.tableName, filter, updateDocument)
    } catch (e) {
      console.log('> Erro: ', e)
      return null
    }
  }

  public async index(id: any = 0, company_board_id: any, title: any = '') {
    const params = {}

    if (id || (id !== undefined && id !== 0)) params['_id'] = this.toId(id)
    params['company_board_id'] = this.toId(company_board_id)
    if (title && title !== '') params['title'] = title

    const nested: any = [
      {
        $match: {
          company_board_id: this.toId(company_board_id),
          _id: id || (id !== undefined && id !== 0) ? this.toId(id) : null,
          title: title && title !== '' ? title : null,
        },
      },
      {
        $lookup: {
          from: 'company_list_tasks',
          let: { listid: '$_id' },
          pipeline: [
            { $match: { $expr: { $eq: ['$company_list_id', '$$listid'] } } },
            {
              $lookup: {
                from: 'company_list_tasks_history',
                let: { taskid: '$_id' },
                pipeline: [{ $match: { $expr: { $eq: ['$company_list_tasks_id', '$$taskid'] } } }],
                as: 'task_history',
              },
            },
          ],
          as: 'list_tasks',
        },
      },
    ]

    // const aggregate: any = [
    //   {
    //     $match: {
    //       company_board_id: this.toId(company_board_id),
    //       _id: id || (id !== undefined && id !== 0) ? this.toId(id) : null,
    //       title: title && title !== '' ? title : null,
    //     },
    //   },
    //   {
    //     $lookup: {
    //       from: 'company_list_tasks',
    //       foreignField: 'company_list_id',
    //       localField: '_id',
    //       as: 'list_tasks',
    //     },
    //   },
    // ]

    // if (!aggregate[0].$match?.title) {
    //   delete aggregate[0].$match?.title
    // }
    // if (!aggregate[0].$match?._id) {
    //   delete aggregate[0].$match?._id
    // }

    if (!nested[0].$match?.title) {
      delete nested[0].$match?.title
    }
    if (!nested[0].$match?._id) {
      delete nested[0].$match?._id
    }

    const lookup: LookupModel = {
      using: true,
      aggregate: nested,
    }

    const result = await this.getDocuments(this.tableName, params, lookup)

    return result
  }

  public async show(id: any, company_board_id: any = null, title: any = '') {
    const params = {}

    if (id || (id !== undefined && id !== 0)) params['_id'] = this.toId(id)
    if (company_board_id && company_board_id !== 0)
      params['company_board_id'] = this.toId(company_board_id)
    if (title && title !== '') params['title'] = title

    return await this.getDocument(this.tableName, params)
  }
}
