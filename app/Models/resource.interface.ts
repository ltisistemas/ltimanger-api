export default interface Resources {
  index(params): any[]
  show(id?: any): any
  store(fields: any): any
  update(id: any, fields: any): any
  destroy(id: any): any
}
