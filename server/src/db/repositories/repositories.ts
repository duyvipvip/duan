import {
    IRepositories,
    IUserRepository,
    IChuXeRepository,
    IKhachHangRepository,
    IChuyenDiRepository
} from "../../interfaces";
import { UserRepository } from ".";
import { ChuXeRepository } from "./chuxe.repository";
import { KHRepository } from "./khachhang.repository";
import { ChuyenDiRepository } from "./chuyendi.repository";

export default class Repositories implements IRepositories {
    public userRepository: IUserRepository;
    public chuXeRepository: IChuXeRepository;
    public khachHangRepository: IKhachHangRepository;
    public chuyenDiRepository: IChuyenDiRepository;
    /**
     * Create new Repository DI
     */
    constructor() {
        this.userRepository = new UserRepository();
        this.chuXeRepository = new ChuXeRepository();
        this.khachHangRepository = new KHRepository();
        this.chuyenDiRepository = new ChuyenDiRepository();
    }
}
