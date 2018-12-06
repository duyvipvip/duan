import { RepositoryBase } from "./repositoryBase";
import { chuyenDiModel } from "../models";
import { IChuXeRepository, IChuyenDiRepository } from "../../interfaces";

export class ChuyenDiRepository extends RepositoryBase<any> implements IChuyenDiRepository {
    constructor() {
        super(chuyenDiModel);
    }
}
