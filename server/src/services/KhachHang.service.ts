import {
    IRepositories,
    IChuyenDiRepository,
    IToken,
    IMail,
    ITokenConfig,
    IContrib
} from "../interfaces";
import { Error } from "../constants";

export class KHService {
    private chuyenDiRepo: IChuyenDiRepository;

    private token: IToken;
    private mailer: IMail;
    private tokenConfig: ITokenConfig;

    constructor(repoList: IRepositories, contrib: IContrib, config: ITokenConfig) {
        this.chuyenDiRepo = repoList.chuyenDiRepository;
        this.token = contrib.token;
        this.mailer = contrib.mail;
        this.tokenConfig = config;
    }

    public async bookChuyenDi(data: any): Promise<any | null> {
        try {
            // Kiem tra xem khach hang co dang book chuyen di khac khong
            const kiemTra = await this.chuyenDiRepo.find({ IDKH: data.user._id, TrangThai: 1 });
            if (kiemTra) {
                throw {
                    error: `Bạn đã book lịch trước đó rồi. Vui lòng liên hệ với chủ xe để huỷ lịch trước đó
                            nếu bạn muốn book lịch mới`, status: 400
                };
            }
            const bookChuyen = {
                DiemDi: data.DiemDi,
                DiemDen: data.DiemDen,
                IDKH: data.user._id,
                ThoiGian: data.ThoiGian || new Date(Date.now())
            };
            // tslint:disable-next-line:no-console
            // console.log(bookChuyen, "bookChuyen");
            const result = await this.chuyenDiRepo.create(bookChuyen as any);
            return result;
        } catch (err) {
            throw err;
        }
    }

}
