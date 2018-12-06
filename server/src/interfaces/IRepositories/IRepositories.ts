import { IUserRepository } from ".";
import { IKhachHangRepository } from "./IKhachHangRepository";
import { IChuXeRepository } from "./IChuXeRepository";
import { IChuyenDiRepository } from "./IChuyenDiRepository";

export interface IRepositories {
    userRepository: IUserRepository;
    khachHangRepository: IKhachHangRepository;
    chuXeRepository: IChuXeRepository;
    chuyenDiRepository: IChuyenDiRepository;
}
