import {
    IRepositories,
    IChuyenDiRepository,
    IToken,
    IMail,
    ITokenConfig,
    IContrib,
    IChuXeRepository,
    IUserRepository
} from "../interfaces";
import { Error, TrangThaiChuXe } from "../constants";

export class ChuXeService {
    private chuXeRepo: IChuXeRepository;
    private chuyenDiRepo: IChuyenDiRepository;
    private userRepo: IUserRepository;

    private token: IToken;
    private mailer: IMail;
    private tokenConfig: ITokenConfig;

    constructor(repoList: IRepositories, contrib: IContrib, config: ITokenConfig) {
        this.chuXeRepo = repoList.chuXeRepository;
        this.chuyenDiRepo = repoList.chuyenDiRepository;
        this.userRepo = repoList.userRepository;
        this.token = contrib.token;
        this.mailer = contrib.mail;
        this.tokenConfig = config;
    }

    public async nhanChuyenDi(id: string, token: any): Promise<any | null> {
        try {
            // Kiem tra xem chuyen di nay da co chu xe khac nhan chua
            const checkCurrent = await this.chuyenDiRepo.findById(id);
            if (checkCurrent.IDChuXe) {
                throw{error: "Chuyến đi này đã có chủ xe khác đặt, bạn chậm mất rồi", status: 400};
            } else {
                const result = await this.chuyenDiRepo.updateById(
                    id, {IDChuXe: token.user._id, TrangThai: TrangThaiChuXe.DangChay}
                );
            }
            return true;
        } catch (err) {
            throw err;
        }
    }

    public async danhSachCacChuyenDi(id: string): Promise<any | null> {
        try {
            // Kiem tra xem chuyen di nay da co chu xe khac nhan chua
            const result: any = await this.userRepo.findById(id);
            if (result) {
                const thongTin: any = await this.chuXeRepo.findById(result.IDChuXe);
                if (thongTin.TrangThai === TrangThaiChuXe.DangRanh) {
                    const ketqua = await this.chuXeRepo.danhSachChuyenDiChuaCoChuXe();
                    return ketqua;
                }
            }
            return null;
        } catch (err) {
            throw err;
        }
    }

    public async thongTinCoBanChuXeByID(id: string): Promise<any | null> {
        try {
            const result: any = await this.userRepo.findById(id);
            if (result) {
                const thongTin = await this.chuXeRepo.findById(result.IDChuXe);
                return thongTin;
            } else {
                throw{error: "Người dùng không tồn tại", status: 400};
            }
        } catch (err) {
            throw err;
        }
    }

    public async capNhatThongTinChuXe(id: string,  modifer: object): Promise<any | null> {
        try {
            const result: any = await this.userRepo.findById(id);
            if (result) {
                const thongTin = await this.chuXeRepo.updateById(result.IDChuXe, modifer);
                return thongTin;
            } else {
                throw{error: "Người dùng không tồn tại", status: 400};
            }
        } catch (err) {
            throw err;
        }
    }

}
