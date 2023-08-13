import { ssrMiddleware } from 'quasar/wrappers'
import session from 'express-session';
import express from 'express';
import db from 'src-ssr/lib/ConnectSequelize';
import ConnectSession from 'connect-session-sequelize';
import socketIdCtrl from 'src-ssr/controller/socketIdCtrl';
import getSocketToken from 'src-ssr/lib/getSocketToken';

export default ssrMiddleware(async ({ app, port, resolve, publicPath, folders, render, serve }) => {

  // 바디 파서
  app.use(express.json());
  app.use(express.urlencoded({extends: true}));

  global.$DB = db;

  const connectSession = ConnectSession(session.Store);
  const mySqlStore = new connectSession({ db : db.sequelize });

  app.use(session({
    key : 'connect.sid',
    secret: 'keyboard cat',
    store : mySqlStore,
    resave: false,
    saveUninitialized: true,
  }))

  db.sequelize.sync({
    // true ==> 실행 할때 자원이 없을 경우 자동으로 생성
    alter : process.env.NODE_ENV == 'development'
  });

  app.get('*', (req, res, next)=> {
    if (!req.session.socketToken) {
      req.session.socketToken = getSocketToken();
      req.session.save();
      console.log("New Session Socket ID =>", req.session.socketToken);
    }
    next();
  });

  app.get('/sso', socketIdCtrl);
})
