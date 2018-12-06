import { RepositoryBase } from "./repositoryBase";
import { KHModel } from "../models";
import { IKhachHangRepository } from "../../interfaces";

export class KHRepository extends RepositoryBase<any> implements IKhachHangRepository {
    constructor() {
        super(KHModel);
    }
}
