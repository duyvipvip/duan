import { Request, Response, NextFunction } from "express";
import {  CError, IRouteConfig, IKHService } from "../../interfaces";

export class KHController {
    private KHService: IKHService;
    constructor(config: IRouteConfig) {
        this.KHService = config.services.KHService;
    }

    public async bookChuyenDi(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            // DiemDi, DiemDen
            // console.log(req.body, "req.body");
            const result = await this.KHService.bookChuyenDi(req.body);
            res.json({result});
        } catch (err) {
            next(new CError(err.error || err, err.status));
        }
    }

}
