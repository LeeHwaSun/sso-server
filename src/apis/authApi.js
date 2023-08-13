import { ssoApi, ssoServer } from 'boot/axios';

const URL = `/auth`

const setHeaderToken = token => {
  ssoServer.defaults.headers.common['Authorization'] = 'bearer ' + token;
  ssoApi.defaults.headers.common['Authorization'] = 'bearer ' + token;
}

const unsetHeaderToken = () => {
  delete ssoServer.defaults.headers.common['Authorization']
  delete ssoApi.defaults.headers.common['Authorization']
}

const join = async form => {
  return await ssoApi.post(`${URL}/join`, form);
}
const login = async form => {
  return await ssoApi.post(`${URL}/login`, form);
}

const logout = async socketToken => {
  return await ssoApi.post(`${URL}/logout`, { socketToken });
}

export default {
  join,
  login,
  logout,
  setHeaderToken,
  unsetHeaderToken
}
