import { Router } from "express";
import { IRouteConfig } from "../../interfaces";
import { authMiddleware } from "../middlewares";
import { Roles } from "../../constants";
import { ChuXeController } from "./chuxe.controller";

export const ChuXeRoutes = (config: IRouteConfig): Router => {
    const router = Router();
    const controller =  new ChuXeController(config);
    const ChuXeRequired = authMiddleware({
        role: [Roles.ChuXe],
        token: config.contrib.token,
        userService: config.services.userService
    });
    router.get("/nhanChuyenDi/:idChuyenDi", ChuXeRequired, controller.nhanChuyenDi.bind(controller));
    router.get("/danhSachCacChuyenDi", ChuXeRequired, controller.danhSachCacChuyenDi.bind(controller));
    router.get("/thongTinCoBanChuXeByID", ChuXeRequired, controller.thongTinCoBanChuXeByID.bind(controller));
    router.put("/update", ChuXeRequired, controller.capNhatThongTinChuXe.bind(controller));
    // router.get("/nhanChuyenDi")
    return router;
};
