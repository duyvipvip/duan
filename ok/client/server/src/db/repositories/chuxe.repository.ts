import { RepositoryBase } from "./repositoryBase";
import { chuXeModel, chuyenDiModel } from "../models";
import { IChuXeRepository } from "../../interfaces";

export class ChuXeRepository extends RepositoryBase<any> implements IChuXeRepository {
    constructor() {
        super(chuXeModel);
    }

    public danhSachChuyenDiChuaCoChuXe(): Promise<any> {
        return chuyenDiModel.find({IDChuXe: null}).exec().then();
    }
}
