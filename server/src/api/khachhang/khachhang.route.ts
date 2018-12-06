import { Router } from "express";
import { IRouteConfig } from "../../interfaces";
import { authMiddleware } from "../middlewares";
import { Roles } from "../../constants";
import { KHController } from "./khachhang.controller";

export const KhachHangRoutes = (config: IRouteConfig): Router => {
    const router = Router();
    // const controller =  new UserController(config);
    const controller =  new KHController(config);

    const KHRequired = authMiddleware({
        role: [Roles.KhachHang],
        token: config.contrib.token,
        userService: config.services.userService
    });
    router.post("/bookChuyenDi", KHRequired, controller.bookChuyenDi.bind(controller));
    return router;
};
