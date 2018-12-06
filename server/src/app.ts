import Config from "./config";
import Database from "./db";
import Repositories from "./db/repositories";
import Services from "./services";
const path  = require('path');
import { IRouteConfig, IRepositories } from "./interfaces";
import { ErrorRequestHandler, headerMiddleware } from "./api/middlewares";

import { UserRoutes, AuthRoutes } from "./api";
import { Contrib } from "./contrib";

import { ChuXeRoutes } from "./api/chuxe/chuxe.route";
import { KhachHangRoutes } from "./api/khachhang/khachhang.route";
import { RoleModel } from "./db/models/Role.model";
import { UserModel } from "./db/models";
import { Roles } from "./constants";
import Server from '../../server';

const seeder = require("mongoose-seed");
const bootstap = async () => {
  const config = await Config.bootstap();

  const contrib = new Contrib(config);

  const app = new Server(config);
  const db = new Database(config.DB);
  const dbAddress = `${db.uri}/${db.DB}`;

  db.connect();
  seeder.connect(dbAddress, function () {
        /** Tu dong tao quyen nguoi dung va 1 tai khoan admin */
        RoleModel.find().then((res) => {
          if (res.length === 0) {
            RoleModel.insertMany([{"Ten": [Roles.Admin]}, {"Ten": [Roles.ChuXe]}, {"Ten": [Roles.KhachHang]}]);
          }
        });
        UserModel.find().then((res) => {
          if (res.length === 0) {
            UserModel.insertMany([{"TenDangNhap": "admin", "Password": "admin", "Role": [Roles.Admin]}]);
          }
        });
});

  const repositories = new Repositories();
  const services = new Services({repositories, contrib, config});

  const routeConfig: IRouteConfig = {
    services,
    contrib
  };

  app.addMiddleWare(headerMiddleware);

  app.addRoutes("/api/auth", AuthRoutes(routeConfig));
  app.addRoutes("/api/users", UserRoutes(routeConfig));
  app.addRoutes("/api/chuxe", ChuXeRoutes(routeConfig));
  app.addRoutes("/api/khachhang", KhachHangRoutes(routeConfig));

  app.addMiddleWare(ErrorRequestHandler(contrib.logger));

  return { app, logger: contrib.logger };
};

bootstap().then(({ app, logger }) => {
  app.listen();
  logger.info(`Server is listening on port ${app.options.port}`);
});
