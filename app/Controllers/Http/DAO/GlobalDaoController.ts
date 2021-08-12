import * as bcrypt from 'bcrypt'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export default class GlobalDaoController {
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
