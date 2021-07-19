import * as Jwt from 'jsonwebtoken'
import { jwtKey } from 'Config/app'

export default class Controller {
  public jwtEncode(payload: any) {
    const token = Jwt.sign(payload, jwtKey, { algorithm: 'HS256' })

    return token
  }
  public jwtDecode(token: string) {
    // console.log(token, jwtKey)
    const payload = Jwt.verify(token, jwtKey)

    return payload
  }
}
