import jwt from 'jsonwebtoken';
import Config from '../../config';
import getEncodedId from 'src-ssr/lib/getEncodedId';
const jwtConfig = Config.JWT;

export default () => {
  const payload = {
    socketId : getEncodedId(),
  }
  return jwt.sign(payload, jwtConfig.SECRET, jwtConfig.option);
}
