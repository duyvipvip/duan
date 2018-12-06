import { Request, Response, NextFunction } from "express";
import { IRouteConfig, CError, IChuXeService } from "../../interfaces";
import { User } from "../../entities";

export class ChuXeController {
    private ChuXeService: IChuXeService;

    constructor(config: IRouteConfig) {
        this.ChuXeService = config.services.ChuXeService;
    }

    public async nhanChuyenDi(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await this.ChuXeService.nhanChuyenDi(req.params.idChuyenDi, req.body);
            res.json({result});
        } catch (err) {
            next(new CError(err.error || err, err.status));
        }
    }

    public async capNhatThongTinChuXe(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            try {
                const result = await this.ChuXeService.capNhatThongTinChuXe(req.body.user._id, req.body);
                res.json({result});
            } catch (err) {
                next(new CError(err.error || err, err.status));
            }
        } catch (err) {
            next(new CError(err.error || err, err.status));
        }
    }

    public async danhSachCacChuyenDi(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await this.ChuXeService.danhSachCacChuyenDi(req.body.user._id);
            res.json({result});
        } catch (err) {
            next(new CError(err.error || err, err.status));
        }
    }

    public async thongTinCoBanChuXeByID(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await this.ChuXeService.thongTinCoBanChuXeByID(req.body.user._id);
            res.json({result});
        } catch (err) {
            next(new CError(err.error || err, err.status));
        }
    }

}
