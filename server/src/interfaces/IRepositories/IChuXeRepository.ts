
export interface IChuXeRepository {
    /**
     * find user(s)
     */
    find: (query: object, options?: object) => Promise<any[]>;
    /**
     * find 1 user
     */
    findOne: (query: object) => Promise<any | null>;
    /**
     * find user by email
     */
    findById: (id: string) => Promise<any | null>;
    /**
     * create user
     */
    create: (user: any) => Promise<any>;
    /**
     * update user by id
     */
    updateById: (id: string, modifier: object) => Promise<boolean>;
    /**
     * delete user by id
     */
    deleteById: (email: string) => Promise<boolean>;
    /**
     * count number of users
     */
    count: (query: object) => Promise<number>;
    /**
     * danh sach chuyen di chua co chu xe
     */
    danhSachChuyenDiChuaCoChuXe: () => Promise<any>;
}
