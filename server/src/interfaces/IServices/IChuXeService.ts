
import { IUserList, IUserQuery } from "..";
export interface IChuXeService {
    // CHAP NHAN CHUYEN DI
    nhanChuyenDi: (id: string, token: any) => Promise<any>;

    danhSachCacChuyenDi: (id: string) => Promise<any>;

    thongTinCoBanChuXeByID: (id: string) => Promise<any>;

    capNhatThongTinChuXe: (id: string, modifer: object) => Promise<any>;
}
