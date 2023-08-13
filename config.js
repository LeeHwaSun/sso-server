const production = {
  API_SERVER : 'http://ssoapi.bnb.com:20200',
  SESSION_DB : {
    host : 'localhost',
    port : 3306,
    user : 'bnbsso',
    password : 'bnbsso1234',
    database: 'bnb_sso_api'
  },
  JWT: {
    option : {
      algorithm : 'HS256',
      issuer: "op_instinct"
    },
    SECRET: 'd51530ff-39f0-455b-8874-e7eb61fcd955'
  }
}

const development = {
  API_SERVER : 'http://ssoapi.bnb.com:20200',
  SESSION_DB : {
    host : 'localhost',
    port : 3306,
    user : 'bnbsso',
    password : 'bnbsso1234',
    database: 'bnb_sso_api'
  },
  JWT: {
    option : {
      algorithm : 'HS256',
      issuer: "op_instinct"
    },
    SECRET: 'd51530ff-39f0-455b-8874-e7eb61fcd955'
  }
}

export default process.env.NODE_ENV !== 'production' ? development : production;
