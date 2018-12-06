
import { IUserList, IUserQuery } from "..";
export interface IKHService {
    // BOOK CHUYEN DI
    bookChuyenDi: (data: any) => Promise<any>;
}
